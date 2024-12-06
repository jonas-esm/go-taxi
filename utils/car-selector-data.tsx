import Image from 'next/image'

import { Icon } from '@iconify-icon/react/dist/iconify.mjs'

import { Box } from '@mui/material'

import FamilyCarImage from '@/assets/family_car.png'

import NormalCarImage from '@/assets/normal_car.png'

export const carTypeOptions = (t: any) => [
  {
    id: 'LUXURY',
    label: t('luxury.title'),
    discription: t('luxury.description'),
    carImage: <Image src={NormalCarImage} alt='' />,
    peopleIcon: ({ color }: { color: string }) => <Icon icon='material-symbols:man' width={20} style={{ color }} />,
    capacity: t('luxury.capacity')
  },
  {
    id: 'FAMILY',
    label: t('family.title'),
    discription: t('family.description'),
    carImage: (
      <Box>
        <Image src={FamilyCarImage} alt='' />
      </Box>
    ),
    peopleIcon: ({ color }: { color: string }) => (
      <Icon icon='material-symbols:family-restroom' width={20} style={{ color }} />
    ),
    capacity: t('family.capacity')
  },
  {
    id: 'ECONOMY',
    label: t('economy.title'),
    discription: t('economy.description'),
    carImage: <Image src={NormalCarImage} alt='' />,
    peopleIcon: ({ color }: { color: string }) => <Icon icon='material-symbols:man' width={20} style={{ color }} />,
    capacity: t('economy.capacity')
  }
]
