'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { i18n } from '@/i18n.config'

export default function LocaleSwitcher() {
  const pathName = usePathname()
  const pathSegments = pathName.split('/');
  const PATH = pathSegments[1]

  const redirectedPathName = (locale:any) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <ul className='flex flex-row items-center justify-center px-4 rounded-0 '>
      {i18n.locales.map((locale) => {
        return (
          <li key={locale}>
            <Link
              href={redirectedPathName(locale)}
              className={`${PATH === `${locale}` ? "bg-primary rounded-0" : "bg-gray text-black rounded-0"} px-3 py-1 text-white`}
            >
              {locale}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
