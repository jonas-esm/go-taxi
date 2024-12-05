import aboutUsImage from '@/assets/about_us.png'
import ourMissionImage from '@/assets/our_mission.png'
import ourServicesImage from '@/assets/our_services.png'

export const informationCardsData = (t: any) => [
  {
    title: t('aboutUs.title'),
    order: 0,
    imageSource: aboutUsImage,
    details: t('aboutUs.description')
  },
  {
    title: t('ourMission.title'),
    order: 0,
    imageSource: ourMissionImage,
    details: t('ourMission.description')
  },
  {
    title: t('ourServices.title'),
    order: 0,
    imageSource: ourServicesImage,
    details: t('ourServices.description')
  }
]
