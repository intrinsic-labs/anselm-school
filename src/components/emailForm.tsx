"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  email: string;
};

interface EmailFormProps {
  onSuccess?: () => void;
}

export default function EmailForm({ onSuccess }: EmailFormProps = {}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<FormData>();
  
  // Watch the email field to determine when to show the submit button
  const emailValue = watch('email');
  
  useEffect(() => {
    // Show the button when the email field has content
    setShowButton(!!emailValue);
  }, [emailValue]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null); // Clear any previous errors
    
    try {
      // Send the email to our API route
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      // Show success message
      setIsSubmitted(true);
      
      // Wait 2 seconds before resetting the form to show success message
      setTimeout(() => {
        reset();
        setIsSubmitted(false);
        
        // Call the success callback after showing success message
        if (onSuccess) {
          onSuccess();
        }
      }, 2000);
      
    } catch (error) {
      console.error('Subscription error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(`That didn't work. Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="relative w-full">

        <div className="flex-col items-center justify-center">
          <input
            type="email"
            placeholder="user@example.com"
            className="form-input w-full rounded-full text-white placeholder-white/50 text-base font-ibm-plex-mono bg-tertiary py-3 px-4"
            {...register('email', { 
              required: 'Email is required', 
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            disabled={isSubmitted || isLoading}
          />
          {showButton && !isSubmitted && (
            <button 
              type="submit" 
              className="bg-secondary hover:bg-secondary/90 text-white px-6 py-2 mt-2 rounded-full transition-all w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Submit'}
            </button>
          )}
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
        )}
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
        {isSubmitted && (
          <p className="text-secondary text-md mt-2">Thank you for subscribing!</p>
        )}
      </div>
    </form>
  );
} 