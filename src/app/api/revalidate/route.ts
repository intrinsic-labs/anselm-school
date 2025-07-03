import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')
    
    // Verify the secret to prevent unauthorized revalidation
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }
    
    // Get the path to revalidate from the request body
    const body = await request.json()
    const path = body.path || '/'
    
    // Revalidate the specific path
    revalidatePath(path)
    
    console.log(`Revalidated path: ${path}`)
    
    return NextResponse.json({ 
      message: 'Revalidation successful', 
      path,
      timestamp: new Date().toISOString() 
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating' }, 
      { status: 500 }
    )
  }
} 