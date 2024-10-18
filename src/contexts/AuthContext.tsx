// import { createContext, useEffect, useState } from "react";
// import { User } from "@supabase/supabase-js";
// import { supabase } from "@/lib/supabase";

// interface AuthContextType {
//   user: User | null;
//   isManager: boolean;
//   organization?: {
//     id: string;
//     organizationname: string;
//   };
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [isManager, setIsManager] = useState(false);
//   const [organization, setOrganization] =
//     useState<AuthContextType["organization"]>();

//   useEffect(() => {
//     // Subscribe to auth state changes
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((event, session) => {
//       setUser(session?.user ?? null);
//       // Check if user is manager based on custom claims or role
//       setIsManager(session?.user?.user_metadata?.role === "authenticated");
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, isManager, organization }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
