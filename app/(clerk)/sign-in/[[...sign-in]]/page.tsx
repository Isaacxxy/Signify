'use client'
import { SignIn } from '@clerk/nextjs'
import { div } from '@tensorflow/tfjs'
import { useSearchParams } from 'next/navigation'


export default function Page() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect_url') || '/'
  return <SignIn forceRedirectUrl={redirectUrl} />

}