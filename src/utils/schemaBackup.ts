// model Manager {
//     id            Int            @id @default(autoincrement())
//     name          String
//     organizations Organization[]
//   }

//   model Organization {
//     id               Int        @id @default(autoincrement())
//     organizationName String
//     userId           Int
//     accessCode       Int
//     greeting         String
//     user             Manager    @relation(fields: [userId], references: [id])
//     seasonals        Seasonal[]

//   }

//   model Classic {
//     id           Int      @id @default(autoincrement())
//     name         String
//     recipe       Json
//     method       String
//     glass        String
//     garnish      Json
//     tastingNotes String[]
//     info         String
//     imageUrl     String?
//   }

//   model Seasonal {
//     id             Int          @id @default(autoincrement())
//     organizationId Int
//     isActive       Boolean
//     name           String
//     recipe         Json
//     method         String
//     glass          String
//     garnish        Json
//     tastingNotes   String[]
//     info           String
//     imageUrl       String?
//     needsPrep      Boolean
//     prep           Prep[]
//     organization   Organization @relation(fields: [organizationId], references: [id])
//   }

//   model Prep {
//     id           Int      @id @default(autoincrement())
//     seasonalId   Int
//     name         String
//     recipe       Json
//     instructions String
//     seasonal     Seasonal @relation(fields: [seasonalId], references: [id])
//   }
