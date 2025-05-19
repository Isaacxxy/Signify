"use client"
import { SignUp } from '@clerk/nextjs'
import { usePathname, useSearchParams } from 'next/navigation'

export default function Page() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect_url') || '/'
  return <SignUp forceRedirectUrl={redirectUrl} />
}