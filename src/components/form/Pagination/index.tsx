import { Stack, Button, Box, Text} from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountRegistros: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}
const siblinsCount = 1;

//Funçao que gera as paginas do array 4 5 6 por exemplo
function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({
  totalCountRegistros,
  registerPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.floor(totalCountRegistros / registerPerPage);

  const previusPage =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblinsCount, currentPage - 1)
      : [];

  const nextPage =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblinsCount, lastPage)
        )
      : [];

  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>

 

      <Stack direction="row" spacing="2">

      {currentPage > ( 1 + siblinsCount) && (
        <>
       <PaginationItem onPageChange={onPageChange} number={1} />
       {(currentPage > 2 + siblinsCount) && <Text color='gray.300' w='8' textAlign='center'>...</Text>}
       </>
    )}

        {previusPage.length > 0 &&
          previusPage.map((page) => {
            return <PaginationItem onPageChange={onPageChange} key={page} number={page} />;
          })}
        <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />

        {nextPage.length > 0 &&
          nextPage.map((page) => {
            return <PaginationItem onPageChange={onPageChange} key={page} number={page} />;
          })}
        
        {(currentPage + siblinsCount) < lastPage && (
          <>
           {(currentPage + 1 + siblinsCount < lastPage) && <Text color='gray.300' w='8' textAlign='center'>...</Text>}
              <PaginationItem onPageChange={onPageChange} number={lastPage} />
            </>
            )}

     




      </Stack>
    </Stack>
  );
}
