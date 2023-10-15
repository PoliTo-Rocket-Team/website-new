export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
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
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chiefs_subteam_fkey"
            columns: ["subteam"]
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
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "divisions_subteam_fkey"
            columns: ["subteam"]
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
        }
        Insert: {
          answer: string
          id?: number
          question: string
        }
        Update: {
          answer?: string
          id?: number
          question?: string
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
            referencedRelation: "divisions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_person_fkey"
            columns: ["person"]
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
            referencedRelation: "subteams"
            referencedColumns: ["id"]
          }
        ]
      }
      people: {
        Row: {
          first_name: string
          id: number
          last_name: string
          linkedin: string | null
          user: string | null
        }
        Insert: {
          first_name: string
          id?: number
          last_name: string
          linkedin?: string | null
          user?: string | null
        }
        Update: {
          first_name?: string
          id?: number
          last_name?: string
          linkedin?: string | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "people_user_fkey"
            columns: ["user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      positions: {
        Row: {
          close_at: string | null
          description: string
          desirable: string[]
          division: number
          form: string | null
          id: number
          name: string
          number: number
          required: string[] | null
        }
        Insert: {
          close_at?: string | null
          description: string
          desirable: string[]
          division: number
          form?: string | null
          id?: number
          name: string
          number: number
          required?: string[] | null
        }
        Update: {
          close_at?: string | null
          description?: string
          desirable?: string[]
          division?: number
          form?: string | null
          id?: number
          name?: string
          number?: number
          required?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "positions_division_fkey"
            columns: ["division"]
            referencedRelation: "divisions"
            referencedColumns: ["id"]
          }
        ]
      }
      subteams: {
        Row: {
          chief: number | null
          code: string
          end: string | null
          id: number
          name: string
          title_name: string
        }
        Insert: {
          chief?: number | null
          code: string
          end?: string | null
          id?: number
          name: string
          title_name: string
        }
        Update: {
          chief?: number | null
          code?: string
          end?: string | null
          id?: number
          name?: string
          title_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "subteams_chief_fkey"
            columns: ["chief"]
            referencedRelation: "people"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_division_of: {
        Args: {
          _user: string
        }
        Returns: number[]
      }
      get_person_id_from_user: {
        Args: {
          _user: string
        }
        Returns: number
      }
      get_subteam_of: {
        Args: {
          _user: string
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
