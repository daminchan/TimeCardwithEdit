//モバイルでの切り替え時に使用する予定
// // クライアントコンポーネントとして分離
// "use client";
// import FlexCol from "@/components/ui/FlexCol";
// import { Box, Heading, useBreakpointValue } from "@chakra-ui/react";
// import TimeCardPanel from "./TimeCardPanel";
// import TimeCardViewTable from "./TimeCardViewTable";

// export default function TimecardPageContent({ userName, latestEntry, userId, entries }) {
//   // モバイルかどうかを判定
//   const isMobile = useBreakpointValue({ base: true, md: false });

//   return (
//     <Box>
//       <FlexCol gap={isMobile ? 6 : 12}>
//         <Heading
//           as="h1"
//           size={isMobile ? "xl" : "2xl"}
//           textAlign="center"
//           px={isMobile ? 4 : 0}
//         >
//           {userName}のタイムカード
//         </Heading>
//         <TimeCardPanel
//           latestEntry={latestEntry}
//           userId={userId}
//           isMobile={isMobile}
//         />
//         <TimeCardViewTable
//           entries={entries}
//           isMobile={isMobile}
//         />
//       </FlexCol>
//     </Box>
//   );
// }
