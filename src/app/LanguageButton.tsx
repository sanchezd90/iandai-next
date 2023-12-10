'use client'
import React from 'react'
import { Language, selectLanguages, updateSelectedLanguage } from '@/lib/slices/languages/languagesSlice'
import { dispatch, useSelector } from '@/lib/store'

export const LanguageButton = ({language}:{language:Language}) => { 
    const {selectedLanguage} = useSelector(selectLanguages)   
    const handleLanguageSelect = () => {
      dispatch(updateSelectedLanguage(language))
    };
    return (
        <button type="button" style={{fontWeight:selectedLanguage?._id===language._id?600:400}} onClick={handleLanguageSelect}>
          {language.name}
        </button>
      )
}
