import { CompanyIndustry, CompanyType } from '../enums/company.enum';

export interface Company {
  id: number;
  uid: string;
  business_name: string;
  suffix: string;
  industry: CompanyIndustry;
  type: CompanyType;
  catch_phrase: string;
  phone_number: string;
  full_address: string;
  latitude: number;
  longitude: number;
  logo: string;
}
