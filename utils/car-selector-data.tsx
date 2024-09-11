import Image from 'next/image'

import { Icon } from '@iconify-icon/react/dist/iconify.mjs'

import { Box } from '@mui/material'

import FamilyCarImage from '@/assets/family_car.png'

import NormalCarImage from '@/assets/normal_car.png'

export const carTypeOptions = [
  {
    label: 'LUXURY',
    discription: 'Comfort, luxurious design',
    carImage: <Image src={NormalCarImage} alt='' />,
    peopleIcon: ({ color }: { color: string }) => <Icon icon='material-symbols:man' width={20} style={{ color }} />,
    capacity: '4'
  },
  {
    label: 'FAMILY',
    discription: 'Big, sturdy, family friendly',
    carImage: (
      <Box ml={-4}>
        <Image src={FamilyCarImage} alt='' />
      </Box>
    ),
    peopleIcon: ({ color }: { color: string }) => (
      <Icon icon='material-symbols:family-restroom' width={20} style={{ color }} />
    ),
    capacity: '8'
  },
  {
    label: 'ECONOMY',
    discription: 'Practicality, comfort, everyday use',
    carImage: <Image src={NormalCarImage} alt='' />,
    peopleIcon: ({ color }: { color: string }) => <Icon icon='material-symbols:man' width={20} style={{ color }} />,
    capacity: '4'
  }
]
