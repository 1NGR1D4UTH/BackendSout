import { morphologie } from "@prisma/client"

export class CreateClientDto {
  userId     :   string
  userCreated :  string       
  morphologie  : morphologie
}

// "userId"     :   "aa1b4bea-c20a-49b5-9a06-fe0c1de28644",
//   "userCreated" :  "aa1b4bea-c20a-49b5-9a06-fe0c1de28644" ,      
//   "morphologie"  : "ENFANT"
