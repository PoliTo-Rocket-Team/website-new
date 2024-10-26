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
      advisors: {
        Row: {
          first_name: string
          has_pp: boolean | null
          id: number
          last_name: string | null
          linkedin: string | null
          title_name: string | null
        }
        Insert: {
          first_name: string
          has_pp?: boolean | null
          id?: number
          last_name?: string | null
          linkedin?: string | null
          title_name?: string | null
        }
        Update: {
          first_name?: string
          has_pp?: boolean | null
          id?: number
          last_name?: string | null
          linkedin?: string | null
          title_name?: string | null
        }
        Relationships: []
      }
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
          },
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
          },
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
          },
        ]
      }
      members: {
        Row: {
          first_name: string
          last_name: string
          linkedin: string | null
          title_name: string | null
        }
        Insert: {
          first_name: string
          last_name: string
          linkedin?: string | null
          title_name?: string | null
        }
        Update: {
          first_name?: string
          last_name?: string
          linkedin?: string | null
          title_name?: string | null
        }
        Relationships: []
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
          },
        ]
      }
      orders: {
        Row: {
          createdAt: string
          description: string
          id: number
          name: string
          price: number
          quantity: number
          quoteName: string | null
          reason: string
          requester: number
          status: Database["public"]["Enums"]["request_status"]
        }
        Insert: {
          createdAt?: string
          description: string
          id?: number
          name: string
          price: number
          quantity: number
          quoteName?: string | null
          reason: string
          requester: number
          status?: Database["public"]["Enums"]["request_status"]
        }
        Update: {
          createdAt?: string
          description?: string
          id?: number
          name?: string
          price?: number
          quantity?: number
          quoteName?: string | null
          reason?: string
          requester?: number
          status?: Database["public"]["Enums"]["request_status"]
        }
        Relationships: []
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
        Relationships: []
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
          open?: boolean
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
          },
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
          },
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
          },
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
          },
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
      get_chiefs: {
        Args: Record<PropertyKey, never>
        Returns: {
          title_name: string
          first_name: string
          last_name: string
          linkedin: string
          has_pp: boolean
        }[]
      }
      get_complete_subteams: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          code: string
          chief: Database["public"]["CompositeTypes"]["chief_info"]
          coordinator1: Database["public"]["CompositeTypes"]["coordinator_info"]
          coordinator2: Database["public"]["CompositeTypes"]["coordinator_info"]
          leads: Database["public"]["CompositeTypes"]["lead_info"][]
        }[]
      }
      get_division_of: {
        Args: {
          _user: string
        }
        Returns: number[]
      }
      get_last_name: {
        Args: {
          user_uuid: string
        }
        Returns: string
      }
      get_latest_president: {
        Args: Record<PropertyKey, never>
        Returns: {
          first_name: string
          last_name: string
          linkedin: string
          id4pp: number
        }[]
      }
      get_members: {
        Args: Record<PropertyKey, never>
        Returns: {
          first_name: string
          last_name: string
          title_name: string
          linkedin: string
        }[]
      }
      get_number: {
        Args: Record<PropertyKey, never>
        Returns: number
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
      get_person_data: {
        Args: {
          user_uuid: string
        }
        Returns: {
          id: number
          first_name: string
          last_name: string
          linkedin: string
          has_pp: boolean
          is_president: boolean
          lead_of: Database["public"]["CompositeTypes"]["division_info"][]
          chief_of: Database["public"]["CompositeTypes"]["subteam_info"]
        }[]
      }
      get_person_id: {
        Args: {
          user_uuid: string
        }
        Returns: number
      }
      get_person_id_from_user: {
        Args: {
          _user: string
        }
        Returns: number
      }
      get_president_id: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_subteam_of: {
        Args: {
          _user: string
        }
        Returns: number
      }
      get_subteams: {
        Args: Record<PropertyKey, never>
        Returns: {
          subteam: string
          firstname: string
          lastname: string
          linkedin: string
          has_pp: boolean
        }[]
      }
      is_developer: {
        Args: {
          email: string
        }
        Returns: boolean
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
      chief_info: {
        first_name: string | null
        last_name: string | null
        linkedin: string | null
        id4pp: number | null
        title: string | null
      }
      coordinator_info: {
        first_name: string | null
        last_name: string | null
        linkedin: string | null
        id4pp: number | null
      }
      division_info: {
        id: number | null
        code: string | null
        name: string | null
        acting: boolean | null
      }
      lead_info: {
        first_name: string | null
        last_name: string | null
        linkedin: string | null
        id4pp: number | null
        acting: boolean | null
        division: string | null
      }
      subteam_info: {
        id: number | null
        code: string | null
        name: string | null
        title: string | null
      }
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
