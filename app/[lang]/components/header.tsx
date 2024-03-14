import Link from 'next/link'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import LocaleSwitcher from './locale-switcher'
import MobileNav from './mobileNav'
import { Bell, CircleUser } from 'lucide-react'

export default async function Header({ lang }: { lang: Locale }) {
  const { navigation } = await getDictionary(lang)
  return (
    <header className=''>
      <div className='flex justify-end gap-x-4 pt-2 lg:hidden'>
        <MobileNav navigation={navigation} lang={lang} />
      </div>

      <nav className='container flex h-20  items-center justify-between bg-white shadow-sm '>
        <div className='flex flex-row gap-x-4 space-x-5'>
          <Link href={`/${lang}`}>
            <p className='text-2xl font-bold  text-secondprimary'>
              Glansan<span className='text-tertiary'>dehem</span>
            </p>
          </Link>
          <ul className='hidden items-center justify-center gap-x-8 lg:flex'>
            <li>
              <Link href={`/${lang}`}>{navigation.home}</Link>
            </li>
            <li>
              <Link href={`/${lang}/about`}>{navigation.about}</Link>
            </li>
          </ul>
        </div>

        <div className='flex flex-row items-center justify-around'>
          <div>
            <div className='relative mr-2 px-4'>
              <Bell className='rounded-full bg-slate-200 p-1' />{' '}
              <div className='absolute -top-1 right-2 h-2 w-2 rounded-full bg-red-500 text-sm font-bold '></div>
            </div>
          </div>
          <div>
            <Link href={`/${lang}/profile`}>
              <div className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-slate-200 '>
                <CircleUser />
              </div>
            </Link>

            <Link href={`/${lang}/login`}>
              <button className='rounded-xl bg-tertiary px-6 py-1 text-white shadow-lg hover:cursor-pointer  hover:bg-indigo-700'>
                Login
              </button>
            </Link>
          </div>
          <div className='hidden lg:flex'>
            <LocaleSwitcher />
          </div>
        </div>
      </nav>
    </header>
  )
}
