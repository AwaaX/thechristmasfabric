import React from 'react'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from 'next-intl'

const SwhBreadCrumbs = ({title,path,params}) => {
  const t = useTranslations("Common.Breadcrumbs")
  const path_title=path?.replace(/-/g, ' ');
  const formatted_title=params?.category?decodeURIComponent(params.category).replace(/-/g, ' '):title;
  return (
          <div className="breadcrumb-block style-img">
                <div className="breadcrumb-main  overflow-hidden">
                    <div className="container  relative">
                    
                
                                <div className="link flex items-center justify-start gap-2 py-[7px] h-[60px]">
                                    <LocalizedClientLink href={'/'}>{t("home")}</LocalizedClientLink>
                                    <Icon.CaretRight size={14} className='text-secondary2' />
                                    <LocalizedClientLink href={'/'}>{t("products")}</LocalizedClientLink>
                                    {path&&<><Icon.CaretRight size={14} className='text-secondary2' />
                                    <LocalizedClientLink href={`/${path}`} className='capitalize'>{path_title}</LocalizedClientLink></>}
                                    {params?.category&&<><Icon.CaretRight size={14} className='text-secondary2' />
                                    <div className='text-secondary2 capitalize'>{formatted_title}</div></>}
                                </div>
                                {/* {params?.category?<div className="heading2 text-center py-5">{params?.category}</div>:<div className="heading2 text-center py-5">{title}</div>} */}
                               <div className="heading2 text-center py-5">{formatted_title}</div>

                    
                    </div>
                </div>
            </div>
  )
}

export default SwhBreadCrumbs