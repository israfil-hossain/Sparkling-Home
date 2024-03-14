'use client'
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

export default function Signin({ lang }: { lang: any }) {
  const router = useRouter()
  const { status } = useSession()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  console.log({status})

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const handleLogin = async (values: any) => {
    try {
      console.log({values})
      setLoading(true)
      const res = await signIn('Credentials', {
        email: values?.email,
        password: values?.password,
        redirect: false,
        callbackUrl: '/login'
      })
      if (res?.ok) {
        toast({
          title: 'Successful',
          description: 'Logged In'
        })

        router.push('/profile')
      } else {
        toast({
          title: 'Session time out. Please login again.',
          description: `${res?.error}`
        })
       
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  return (
    <div className='bg-gray-50 dark:bg-gray-900 flex min-h-screen flex-col items-center justify-center'>
      <Card className='w-full max-w-md px-4 py-10'>
        <CardHeader className='space-y-2 text-center'>
          <CardTitle className='text-2xl font-bold'>Sign In</CardTitle>
          <CardDescription>
            Welcome back! Please sign in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className='space-y-4' onSubmit={handleLogin} >
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                placeholder='m@example.com'
                required
                type='email'
              />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='password'>Password</Label>
                <Link className='text-sm underline' href='#'>
                  Forgot your password?
                </Link>
              </div>
              <Input id='password' required type='password' />
            </div>
            <Button
              className='w-full bg-blue-800 text-white hover:bg-blue-700'
              type='submit'
            >
              Sign In
            </Button>
          </form>
          <div className='mt-4 text-center text-sm'>
            {"Don't have an account?"}
            <Link className='underline' href={`/${lang}/register`}>
              Create an Account
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
