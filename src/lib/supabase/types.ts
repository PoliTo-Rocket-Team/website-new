export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chiefs: {
        Row: {
          description: string
          from: string
          id: number
          person: number
          subteam: number
        }
        Insert: {
          description?: string
          from: string
          id?: number
          person: number
          subteam: number
        }
        Update: {
          description?: string
          from?: string
          id?: number
          person?: number
          subteam?: number
        }
        Relationships: [
          {
            foreignKeyName: "chiefs_person_fkey"
            columns: ["person"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chiefs_subteam_fkey"
            columns: ["subteam"]
            isOneToOne: false
            referencedRelation: "subteams"
            referencedColumns: ["id"]
          }
        ]
      }
      divisions: {
        Row: {
          code: string
          end: string | null
          id: number
          lead: number | null
          lead_acting: boolean
          name: string
          subteam: number
        }
        Insert: {
          code: string
          end?: string | null
          id?: number
          lead?: number | null
          lead_acting?: boolean
          name: string
          subteam: number
        }
        Update: {
          code?: string
          end?: string | null
          id?: number
          lead?: number | null
          lead_acting?: boolean
          name?: string
          subteam?: number
        }
        Relationships: [
          {
            foreignKeyName: "divisions_lead_fkey"
            columns: ["lead"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "divisions_subteam_fkey"
            columns: ["subteam"]
            isOneToOne: false
            referencedRelation: "subteams"
            referencedColumns: ["id"]
          }
        ]
      }
      faqs: {
        Row: {
          answer: string
          id: number
          question: string
          visible: boolean
        }
        Insert: {
          answer: string
          id?: number
          question: string
          visible?: boolean
        }
        Update: {
          answer?: string
          id?: number
          question?: string
          visible?: boolean
        }
        Relationships: []
      }
      leads: {
        Row: {
          acting: boolean
          division: number
          from: string
          id: number
          person: number
        }
        Insert: {
          acting?: boolean
          division: number
          from: string
          id?: number
          person?: number
        }
        Update: {
          acting?: boolean
          division?: number
          from?: string
          id?: number
          person?: number
        }
        Relationships: [
          {
            foreignKeyName: "leads_division_fkey"
            columns: ["division"]
            isOneToOne: false
            referencedRelation: "divisions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_person_fkey"
            columns: ["person"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          }
        ]
      }
      notable_students: {
        Row: {
          description: string
          id: number
          linkedin: string
          name: string
          subteam: number
          year: number
        }
        Insert: {
          description: string
          id?: number
          linkedin: string
          name: string
          subteam: number
          year: number
        }
        Update: {
          description?: string
          id?: number
          linkedin?: string
          name?: string
          subteam?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "notable_students_subteam_fkey"
            columns: ["subteam"]
            isOneToOne: false
            referencedRelation: "subteams"
            referencedColumns: ["id"]
          }
        ]
      }
      people: {
        Row: {
          first_name: string
          has_pp: boolean
          id: number
          last_name: string
          linkedin: string | null
          user: string | null
        }
        Insert: {
          first_name: string
          has_pp?: boolean
          id?: number
          last_name: string
          linkedin?: string | null
          user?: string | null
        }
        Update: {
          first_name?: string
          has_pp?: boolean
          id?: number
          last_name?: string
          linkedin?: string | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "people_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      positions: {
        Row: {
          description: string
          desirable: string[]
          division: number
          form: string | null
          id: number
          name: string
          number: number
          open: boolean
          required: string[] | null
        }
        Insert: {
          description: string
          desirable: string[]
          division: number
          form?: string | null
          id?: number
          name: string
          number: number
          open: boolean
          required?: string[] | null
        }
        Update: {
          description?: string
          desirable?: string[]
          division?: number
          form?: string | null
          id?: number
          name?: string
          number?: number
          open?: boolean
          required?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "positions_division_fkey"
            columns: ["division"]
            isOneToOne: false
            referencedRelation: "divisions"
            referencedColumns: ["id"]
          }
        ]
      }
      presidents: {
        Row: {
          mandate_description: string
          mandate_start: string
          person: number
        }
        Insert: {
          mandate_description?: string
          mandate_start: string
          person: number
        }
        Update: {
          mandate_description?: string
          mandate_start?: string
          person?: number
        }
        Relationships: [
          {
            foreignKeyName: "presidents_person_fkey"
            columns: ["person"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          }
        ]
      }
      requests: {
        Row: {
          created_at: string
          data: Json
          from: number
          id: number
          status: Database["public"]["Enums"]["request_status"]
          type: Database["public"]["Enums"]["request_type"]
        }
        Insert: {
          created_at?: string
          data: Json
          from: number
          id?: number
          status?: Database["public"]["Enums"]["request_status"]
          type: Database["public"]["Enums"]["request_type"]
        }
        Update: {
          created_at?: string
          data?: Json
          from?: number
          id?: number
          status?: Database["public"]["Enums"]["request_status"]
          type?: Database["public"]["Enums"]["request_type"]
        }
        Relationships: [
          {
            foreignKeyName: "requests_from_fkey"
            columns: ["from"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          }
        ]
      }
      subteams: {
        Row: {
          chief: number | null
          code: string
          coordinator1: number | null
          coordinator2: number | null
          end: string | null
          id: number
          name: string
          title_name: string
        }
        Insert: {
          chief?: number | null
          code: string
          coordinator1?: number | null
          coordinator2?: number | null
          end?: string | null
          id?: number
          name: string
          title_name: string
        }
        Update: {
          chief?: number | null
          code?: string
          coordinator1?: number | null
          coordinator2?: number | null
          end?: string | null
          id?: number
          name?: string
          title_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_subteams_coordinator1_fkey"
            columns: ["coordinator1"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_subteams_coordinator2_fkey"
            columns: ["coordinator2"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subteams_chief_fkey"
            columns: ["chief"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          }
        ]
      }
      timeline: {
        Row: {
          date: string
          description: string
          id: number
          title: string
          visible: boolean
        }
        Insert: {
          date: string
          description: string
          id?: number
          title: string
          visible?: boolean
        }
        Update: {
          date?: string
          description?: string
          id?: number
          title?: string
          visible?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_all_divisions_of: {
        Args: {
          _user: string
        }
        Returns: number[]
      }
      get_division_of: {
        Args: {
          _user: string
        }
        Returns: number[]
      }
      get_open_positions: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          description: string
          required: string[]
          desirable: string[]
          form: string
          division: string
          subteam: string
          code: string
        }[]
      }
      get_person_id_from_user: {
        Args: {
          _user: string
        }
        Returns: number
      }
      get_president: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_subteam_of: {
        Args: {
          _user: string
        }
        Returns: number
      }
      is_it_related: {
        Args: {
          _user: string
        }
        Returns: boolean
      }
      is_media_related: {
        Args: {
          _user: string
        }
        Returns: boolean
      }
    }
    Enums: {
      request_status: "pending" | "accepted" | "rejected"
      request_type: "close-division" | "appoint-lead" | "appoint-alumni"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
