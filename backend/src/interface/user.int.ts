
export interface user {
    id?: string;
    name: string;
    email: string;
    password: string;
    role: string;
    permissions:Permission[]
  }
  
  export interface Permission{
    id:string;
    name:string;
  }

  export interface Role{
    id:string;
    name:string;
  }