interface User {
    id: any;
    username: string;
    email: string;
    role: 'Admin' | 'Uploader';
    active: boolean;
  }