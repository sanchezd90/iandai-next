'use client'
import React, { useEffect } from 'react'
import { getLanguageList, selectLanguages, updateSelectedLanguage } from '@/lib/slices/languages/languagesSlice';
import { useDispatch, useSelector } from '../../lib/store';
import { LanguageButton } from './LanguageButton';

export const Header = () => {
    const dispatch = useDispatch()
    const {languages} = useSelector(selectLanguages)

useEffect(() => {
  dispatch(getLanguageList())
}, [])

  return (
    <header>
        <div>Choose language:</div>
        {languages.map(language=>{
            return <LanguageButton key={language._id} language={language}/>
        })}
    </header>    
  )
}
