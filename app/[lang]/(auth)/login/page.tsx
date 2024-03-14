import Signin from '@/components/auth/Signin'
import React from 'react'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'

export default async function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  return (
    <div className=' min-h-[100vh] bg-[#f0f1f4] '>
      <Signin lang={lang}/>
    </div>
  )
}
