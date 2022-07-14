import {Text} from '@chakra-ui/react'

export function Logo(){
  return(
    <Text fontSize={["2xl", "3xl"]} fontWeight="bold" letterSpacing="ligth" w="64">
    Dashgo
    <Text as="span" color="pink.500">
      .
    </Text>
  </Text>
  )
}