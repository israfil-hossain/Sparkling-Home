import Signup from '@/components/auth/Signup'
import { Locale } from '@/i18n.config'
import React from 'react'

export default async function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  return (
    <div className=' min-h-[100vh] bg-[#f0f1f4] '>
      <Signup lang={lang}/>
    </div>
  )
}
