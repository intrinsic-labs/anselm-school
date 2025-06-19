import { NextResponse } from 'next/server';

// GET endpoint to test if Google Apps Script is working
export async function GET() {
  try {
    const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    
    console.log('=== DEBUG: Testing Google Apps Script connection ===');
    console.log('Google Apps Script URL configured:', !!googleAppsScriptUrl);
    console.log('URL (first 50 chars):', googleAppsScriptUrl?.substring(0, 50) + '...');
    
    if (!googleAppsScriptUrl) {
      return NextResponse.json({
        status: 'error',
        message: 'Google Apps Script URL not configured',
        debug: {
          envVarExists: false,
          url: null
        }
      }, { status: 500 });
    }

    // Test the connection with a test request that will auto-cleanup
    console.log('Attempting to run Google Apps Script test (with auto-cleanup)...');
    const response = await fetch(googleAppsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        test: true, 
        email: 'test@example.com' 
      }),
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error response text:', errorText);
      
      return NextResponse.json({
        status: 'error',
        message: 'Google Apps Script is not responding correctly',
        debug: {
          responseStatus: response.status,
          responseOk: response.ok,
          errorText: errorText
        }
      }, { status: 500 });
    }

    const result = await response.json();
    console.log('Test response:', result);

    // Check if this was a successful test with cleanup
    if (result.test && result.success) {
      return NextResponse.json({
        status: 'success',
        message: 'Google Apps Script test completed successfully with auto-cleanup',
        debug: {
          responseStatus: response.status,
          responseOk: response.ok,
          testDetails: result.details || result,
          cleanup: 'Test email was added and automatically removed'
        }
      });
    } else if (result.success) {
      return NextResponse.json({
        status: 'success',
        message: 'Google Apps Script is working correctly',
        debug: {
          responseStatus: response.status,
          responseOk: response.ok,
          result: result,
          note: 'Test cleanup may not be implemented'
        }
      });
    } else {
      return NextResponse.json({
        status: 'error',
        message: 'Google Apps Script responded but reported an error',
        debug: {
          responseStatus: response.status,
          responseOk: response.ok,
          error: result.error || 'Unknown error',
          result: result
        }
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Error testing Google Apps Script:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to test Google Apps Script',
      debug: {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : null
      }
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    console.log('=== DEBUG: Processing subscription request ===');
    
    const { email } = await request.json();
    console.log('Received email:', email);
    
    if (!email) {
      console.log('ERROR: No email provided');
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Google Apps Script Web App URL
    const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL || '';
    
    console.log('Google Apps Script URL configured:', !!googleAppsScriptUrl);
    console.log('URL (first 50 chars):', googleAppsScriptUrl ? googleAppsScriptUrl.substring(0, 50) + '...' : 'Not set');
    
    if (!googleAppsScriptUrl) {
      console.log('WARNING: Google Apps Script URL not configured. Running in development mode.');
      return NextResponse.json(
        { success: true, message: 'Subscription successful (development mode)' },
        { status: 200 }
      );
    }

    // Send the email to the Google Apps Script Web App
    console.log('Sending request to Google Apps Script...');
    const response = await fetch(googleAppsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    console.log('Google Apps Script response status:', response.status);
    console.log('Google Apps Script response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Apps Script error response:', errorText);
      console.error('Response headers:', Object.fromEntries(response.headers.entries()));
      
      throw new Error(`Google Apps Script returned ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log('Google Apps Script success response:', result);
    console.log('Email successfully added to Google Sheet:', email);
    
    return NextResponse.json(
      { success: true, message: 'Subscription successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('=== ERROR: Processing subscription failed ===');
    console.error('Error details:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      { 
        error: 'Failed to process subscription',
        debug: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 