import { Roboto, Open_Sans } from '@next/font/google'
import localFont from '@next/font/local'


export const roboto = Roboto({
    subsets:['latin'],
    weight:['300','400','700'],  
  })

export const openSans = Open_Sans({
    subsets:['latin'],
    weight:['300','400','700'],  
  })

export const robotoBlack = localFont({
    src: './Roboto/Roboto-Black.ttf',
    display: 'swap',    
  })


export const plutoCondBlack = localFont({
  src: './Pluto/PlutoCondBlack.otf',      
  display: 'swap',    
})
export const plutoLight = localFont({
  src: './Pluto/PlutoLight.otf',      
  display: 'swap',    
})
export const plutoBold = localFont({
  src: './Pluto/PlutoBold.otf',      
  display: 'swap',    
})