'use client'
import React from 'react'
import {  selectLanguages} from '@/lib/slices/languages/languagesSlice';
import {useSelector } from '../../lib/store';


export const Header = () => {    
    const {selectedLanguage} = useSelector(selectLanguages)

  return (
    <header>
        <div>{selectedLanguage?.name}</div>        
    </header>    
  )
}
