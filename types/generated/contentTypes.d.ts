import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiApplicantApplicant extends Schema.CollectionType {
  collectionName: 'applicants';
  info: {
    singularName: 'applicant';
    pluralName: 'applicants';
    displayName: 'learners';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    firstname: Attribute.String;
    lastname: Attribute.String;
    email: Attribute.Email & Attribute.Unique;
    dob: Attribute.Date;
    male: Attribute.Boolean & Attribute.DefaultTo<true>;
    southafrican: Attribute.Boolean & Attribute.DefaultTo<true>;
    province: Attribute.String;
    city: Attribute.String;
    physicaladdress: Attribute.RichText;
    postaladdress: Attribute.RichText;
    homelanguage: Attribute.String;
    highestqualification: Attribute.String;
    nextofkin: Attribute.String;
    postalcode: Attribute.Integer;
    currentlystudying: Attribute.Boolean & Attribute.DefaultTo<false>;
    githublink: Attribute.String & Attribute.Unique;
    linkedinlink: Attribute.String & Attribute.Unique;
    previouscompany1: Attribute.String;
    previouscompany2: Attribute.String;
    company1position: Attribute.String;
    company2position: Attribute.String;
    termofcontractcompany1: Attribute.Integer & Attribute.DefaultTo<0>;
    termofcontractcompany2: Attribute.Integer;
    keyresponsibilitiescompany1: Attribute.RichText;
    keyresponsibilitiescompany2: Attribute.RichText;
    Program: Attribute.String;
    idnumber: Attribute.String & Attribute.Unique;
    phonenumber: Attribute.String;
    nextofkinnumber: Attribute.String;
    techskillratings: Attribute.Relation<
      'api::applicant.applicant',
      'manyToMany',
      'api::technicalskill.technicalskill'
    >;
    softskillratings: Attribute.Relation<
      'api::applicant.applicant',
      'manyToMany',
      'api::softskillrating.softskillrating'
    >;
    projects: Attribute.Relation<
      'api::applicant.applicant',
      'manyToMany',
      'api::project.project'
    >;
    imageurl: Attribute.String;
    teamleaders: Attribute.Relation<
      'api::applicant.applicant',
      'manyToMany',
      'api::teamleader.teamleader'
    >;
    teams: Attribute.Relation<
      'api::applicant.applicant',
      'manyToMany',
      'api::team.team'
    >;
    cohorts: Attribute.Relation<
      'api::applicant.applicant',
      'manyToMany',
      'api::cohort.cohort'
    >;
    responsibilities: Attribute.Relation<
      'api::applicant.applicant',
      'manyToMany',
      'api::responsibilitie.responsibilitie'
    >;
    shaperreviews: Attribute.Relation<
      'api::applicant.applicant',
      'manyToMany',
      'api::shaperreview.shaperreview'
    >;
    techskillsratingdescriptions: Attribute.Relation<
      'api::applicant.applicant',
      'manyToMany',
      'api::techskillsratingdescription.techskillsratingdescription'
    >;
    softskilldescriptions: Attribute.Relation<
      'api::applicant.applicant',
      'manyToMany',
      'api::softskilldescription.softskilldescription'
    >;
    problemsolvingratingdescriptions: Attribute.Relation<
      'api::applicant.applicant',
      'manyToMany',
      'api::problemsolvingratingdescription.problemsolvingratingdescription'
    >;
    teamworkratingdescriptions: Attribute.Relation<
      'api::applicant.applicant',
      'manyToMany',
      'api::teamworkratingdescription.teamworkratingdescription'
    >;
    communicationratingdescriptions: Attribute.Relation<
      'api::applicant.applicant',
      'manyToMany',
      'api::communicationratingdescription.communicationratingdescription'
    >;
    leadershipratingdescriptions: Attribute.Relation<
      'api::applicant.applicant',
      'manyToMany',
      'api::leadershipratingdescription.leadershipratingdescription'
    >;
    interpersonalratingdescriptions: Attribute.Relation<
      'api::applicant.applicant',
      'manyToMany',
      'api::interpersonalratingdescription.interpersonalratingdescription'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::applicant.applicant',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::applicant.applicant',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCandidateCandidate extends Schema.CollectionType {
  collectionName: 'candidates';
  info: {
    singularName: 'candidate';
    pluralName: 'candidates';
    displayName: 'candidate';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    firstname: Attribute.String;
    lastname: Attribute.String;
    email: Attribute.Email;
    dob: Attribute.Date;
    male: Attribute.Boolean;
    southafrican: Attribute.Boolean;
    province: Attribute.String;
    city: Attribute.String;
    homelanguage: Attribute.String;
    highestqualification: Attribute.String;
    nextofkin: Attribute.String;
    postalcode: Attribute.Integer;
    currentlystudying: Attribute.Boolean;
    githublink: Attribute.String;
    linkedinlink: Attribute.String;
    previouscompany1: Attribute.String;
    previouscompany2: Attribute.String;
    company1position: Attribute.String;
    company2position: Attribute.String;
    termofcontractcompany1: Attribute.Integer;
    termofcontractcompany2: Attribute.Integer;
    Program: Attribute.String;
    idnumber: Attribute.String;
    phonenumber: Attribute.String;
    nextofkinnumber: Attribute.String;
    imageurl: Attribute.String;
    physicaladdress: Attribute.RichText;
    keyresponsibilitiescompany1: Attribute.RichText;
    keyresponsibilitiescompany2: Attribute.RichText;
    postaladdress: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::candidate.candidate',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::candidate.candidate',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCohortCohort extends Schema.CollectionType {
  collectionName: 'cohorts';
  info: {
    singularName: 'cohort';
    pluralName: 'cohorts';
    displayName: 'cohort';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    description: Attribute.RichText & Attribute.Required;
    applicants: Attribute.Relation<
      'api::cohort.cohort',
      'manyToMany',
      'api::applicant.applicant'
    >;
    teams: Attribute.Relation<
      'api::cohort.cohort',
      'manyToMany',
      'api::team.team'
    >;
    projects: Attribute.Relation<
      'api::cohort.cohort',
      'manyToMany',
      'api::project.project'
    >;
    teamleaders: Attribute.Relation<
      'api::cohort.cohort',
      'manyToMany',
      'api::teamleader.teamleader'
    >;
    skill1: Attribute.Enumeration<
      [
        'ReactJS',
        'Python',
        'Machine Learning',
        'Databases',
        'SQL',
        'CSS',
        'Django',
        'Javascript',
        'HTML',
        'Angular',
        'Bootstrap',
        'Visualisation'
      ]
    >;
    skill2: Attribute.Enumeration<
      [
        'ReactJS',
        'Python',
        'Machine Learning',
        'Databases',
        'SQL',
        'CSS',
        'Django',
        'Javascript',
        'HTML',
        'Angular',
        'Bootstrap',
        'Visualisation'
      ]
    >;
    skill3: Attribute.Enumeration<
      [
        'ReactJS',
        'Python',
        'Machine Learning',
        'Databases',
        'SQL',
        'CSS',
        'Django',
        'Javascript',
        'HTML',
        'Angular',
        'Bootstrap',
        'Visualisation'
      ]
    >;
    skill4: Attribute.Enumeration<
      [
        'ReactJS',
        'Python',
        'Machine Learning',
        'Databases',
        'SQL',
        'CSS',
        'Django',
        'Javascript',
        'HTML',
        'Angular',
        'Bootstrap',
        'Visualisation'
      ]
    >;
    skill5: Attribute.Enumeration<
      [
        'ReactJS',
        'Python',
        'Machine Learning',
        'Databases',
        'SQL',
        'CSS',
        'Django',
        'Javascript',
        'HTML',
        'Angular',
        'Bootstrap',
        'Visualisation'
      ]
    >;
    skill6: Attribute.Enumeration<
      [
        'ReactJS',
        'Python',
        'Machine Learning',
        'Databases',
        'SQL',
        'CSS',
        'Django',
        'Javascript',
        'HTML',
        'Angular',
        'Bootstrap',
        'Visualisation'
      ]
    >;
    skill7: Attribute.Enumeration<
      [
        'ReactJS',
        'Python',
        'Machine Learning',
        'Databases',
        'SQL',
        'CSS',
        'Django',
        'Javascript',
        'HTML',
        'Angular',
        'Bootstrap',
        'Visualisation'
      ]
    >;
    skill1_icon: Attribute.Enumeration<
      [
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/django-icon.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/css-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/html-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/angular-solid.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/bootstrap-wordmark.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/database.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/javascript-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/machine-learning.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/powerbi.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/python-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/react-line.svg'
      ]
    >;
    skill2_icon: Attribute.Enumeration<
      [
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/django-icon.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/css-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/html-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/angular-solid.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/bootstrap-wordmark.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/database.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/javascript-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/machine-learning.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/powerbi.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/python-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/react-line.svg'
      ]
    >;
    skill3_icon: Attribute.Enumeration<
      [
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/django-icon.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/css-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/html-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/angular-solid.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/bootstrap-wordmark.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/database.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/javascript-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/machine-learning.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/powerbi.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/python-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/react-line.svg'
      ]
    >;
    skill4_icon: Attribute.Enumeration<
      [
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/django-icon.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/css-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/html-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/angular-solid.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/bootstrap-wordmark.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/database.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/javascript-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/machine-learning.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/powerbi.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/python-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/react-line.svg'
      ]
    >;
    skill5_icon: Attribute.Enumeration<
      [
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/django-icon.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/css-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/html-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/angular-solid.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/bootstrap-wordmark.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/database.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/javascript-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/machine-learning.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/powerbi.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/python-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/react-line.svg'
      ]
    >;
    skill6_icon: Attribute.Enumeration<
      [
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/django-icon.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/css-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/html-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/angular-solid.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/bootstrap-wordmark.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/database.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/javascript-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/machine-learning.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/powerbi.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/python-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/react-line.svg'
      ]
    >;
    skill7_icon: Attribute.Enumeration<
      [
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/django-icon.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/css-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/html-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/angular-solid.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/bootstrap-wordmark.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/database.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/javascript-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/machine-learning.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/powerbi.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/python-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/react-line.svg'
      ]
    >;
    skill1_description: Attribute.RichText;
    skill2_description: Attribute.RichText;
    skill3_description: Attribute.RichText;
    skill4_description: Attribute.RichText;
    skill5_description: Attribute.RichText;
    skill6_description: Attribute.RichText;
    skill7_description: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::cohort.cohort',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::cohort.cohort',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCommunicationratingdescriptionCommunicationratingdescription
  extends Schema.CollectionType {
  collectionName: 'communicationratingdescriptions';
  info: {
    singularName: 'communicationratingdescription';
    pluralName: 'communicationratingdescriptions';
    displayName: 'communicationratingdescription';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    rating1: Attribute.RichText;
    rating2: Attribute.RichText;
    rating3: Attribute.RichText;
    rating4: Attribute.RichText;
    rating5: Attribute.RichText;
    learners: Attribute.Relation<
      'api::communicationratingdescription.communicationratingdescription',
      'manyToMany',
      'api::applicant.applicant'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::communicationratingdescription.communicationratingdescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::communicationratingdescription.communicationratingdescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactDetailContactDetail extends Schema.CollectionType {
  collectionName: 'contact_details';
  info: {
    singularName: 'contact-detail';
    pluralName: 'contact-details';
    displayName: 'contacts-question';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    question: Attribute.RichText & Attribute.Required;
    option: Attribute.RichText;
    type: Attribute.Enumeration<
      ['Radio', 'Select', 'Text', 'Date', 'Number', 'Url']
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact-detail.contact-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contact-detail.contact-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInterpersonalratingdescriptionInterpersonalratingdescription
  extends Schema.CollectionType {
  collectionName: 'interpersonalratingdescriptions';
  info: {
    singularName: 'interpersonalratingdescription';
    pluralName: 'interpersonalratingdescriptions';
    displayName: 'interpersonalratingdescription';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    rating1: Attribute.RichText;
    rating2: Attribute.RichText;
    rating3: Attribute.RichText;
    rating4: Attribute.RichText;
    rating5: Attribute.RichText;
    learners: Attribute.Relation<
      'api::interpersonalratingdescription.interpersonalratingdescription',
      'manyToMany',
      'api::applicant.applicant'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::interpersonalratingdescription.interpersonalratingdescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::interpersonalratingdescription.interpersonalratingdescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLeadershipratingdescriptionLeadershipratingdescription
  extends Schema.CollectionType {
  collectionName: 'leadershipratingdescriptions';
  info: {
    singularName: 'leadershipratingdescription';
    pluralName: 'leadershipratingdescriptions';
    displayName: 'leadershipratingdescription';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    rating1: Attribute.RichText;
    rating2: Attribute.RichText;
    rating3: Attribute.RichText;
    rating4: Attribute.RichText;
    rating5: Attribute.RichText;
    learners: Attribute.Relation<
      'api::leadershipratingdescription.leadershipratingdescription',
      'manyToMany',
      'api::applicant.applicant'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::leadershipratingdescription.leadershipratingdescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::leadershipratingdescription.leadershipratingdescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiList1List1 extends Schema.CollectionType {
  collectionName: 'list1s';
  info: {
    singularName: 'list1';
    pluralName: 'list1s';
    displayName: 'list1';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    firstname: Attribute.String;
    lastname: Attribute.String;
    email: Attribute.Email;
    dob: Attribute.Date;
    male: Attribute.Boolean;
    southafrican: Attribute.Boolean;
    province: Attribute.String;
    city: Attribute.String;
    homelanguage: Attribute.String;
    highestqualification: Attribute.String;
    nextofkin: Attribute.String;
    postalcode: Attribute.Integer;
    currentlystudying: Attribute.Boolean;
    githublink: Attribute.String;
    linkedinlink: Attribute.String;
    previouscompany1: Attribute.String;
    previouscompany2: Attribute.String;
    company1position: Attribute.String;
    company2position: Attribute.String;
    termofcontractcompany1: Attribute.Integer;
    termofcontractcompany2: Attribute.Integer;
    Program: Attribute.String;
    idnumber: Attribute.String;
    phonenumber: Attribute.String;
    nextofkinumber: Attribute.String;
    imageurl: Attribute.String;
    physicaladdress: Attribute.RichText;
    postaladdress: Attribute.RichText;
    keyresponsibilitiescompany1: Attribute.RichText;
    keyresponsibilitiescompany2: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::list1.list1',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::list1.list1',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPersonalQuestionPersonalQuestion
  extends Schema.CollectionType {
  collectionName: 'personal_questions';
  info: {
    singularName: 'personal-question';
    pluralName: 'personal-questions';
    displayName: 'personal-question';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    question: Attribute.RichText & Attribute.Required;
    option: Attribute.RichText;
    type: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::personal-question.personal-question',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::personal-question.personal-question',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProblemsolvingratingdescriptionProblemsolvingratingdescription
  extends Schema.CollectionType {
  collectionName: 'problemsolvingratingdescriptions';
  info: {
    singularName: 'problemsolvingratingdescription';
    pluralName: 'problemsolvingratingdescriptions';
    displayName: 'problemsolvingratingdescription';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    rating1: Attribute.RichText;
    rating2: Attribute.RichText;
    rating3: Attribute.RichText;
    rating4: Attribute.RichText;
    rating5: Attribute.RichText;
    learners: Attribute.Relation<
      'api::problemsolvingratingdescription.problemsolvingratingdescription',
      'manyToMany',
      'api::applicant.applicant'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::problemsolvingratingdescription.problemsolvingratingdescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::problemsolvingratingdescription.problemsolvingratingdescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectProject extends Schema.CollectionType {
  collectionName: 'projects';
  info: {
    singularName: 'project';
    pluralName: 'projects';
    displayName: 'project';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    projectname: Attribute.String & Attribute.Unique;
    problemstatement: Attribute.RichText;
    solution: Attribute.RichText;
    screenshot1explanation: Attribute.RichText;
    screenshot2explanation: Attribute.RichText;
    screenshot3explanation: Attribute.RichText;
    screenshot4explanation: Attribute.RichText;
    screenshot5explanation: Attribute.RichText;
    screenshot6explanation: Attribute.RichText;
    screenshot7explanation: Attribute.RichText;
    applicants: Attribute.Relation<
      'api::project.project',
      'manyToMany',
      'api::applicant.applicant'
    >;
    teams: Attribute.Relation<
      'api::project.project',
      'manyToMany',
      'api::team.team'
    >;
    cohorts: Attribute.Relation<
      'api::project.project',
      'manyToMany',
      'api::cohort.cohort'
    >;
    imageurl: Attribute.String;
    screenshot1_image: Attribute.String;
    screenshot2_image: Attribute.String;
    screenshot3_image: Attribute.String;
    screenshot4_image: Attribute.String;
    screenshot5_image: Attribute.String;
    screenshot6_image: Attribute.String;
    screenshot7_image: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiQualificationQuestionQualificationQuestion
  extends Schema.CollectionType {
  collectionName: 'qualification_questions';
  info: {
    singularName: 'qualification-question';
    pluralName: 'qualification-questions';
    displayName: 'qualification-question';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    question: Attribute.RichText & Attribute.Required;
    type: Attribute.Enumeration<['Radio', 'Select', 'Text', 'Date', 'Number']>;
    option: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::qualification-question.qualification-question',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::qualification-question.qualification-question',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiResponsibilitieResponsibilitie
  extends Schema.CollectionType {
  collectionName: 'responsibilities';
  info: {
    singularName: 'responsibilitie';
    pluralName: 'responsibilities';
    displayName: 'responsibilitie';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    applicants: Attribute.Relation<
      'api::responsibilitie.responsibilitie',
      'manyToMany',
      'api::applicant.applicant'
    >;
    responsibility: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::responsibilitie.responsibilitie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::responsibilitie.responsibilitie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiShaperreviewShaperreview extends Schema.CollectionType {
  collectionName: 'shaperreviews';
  info: {
    singularName: 'shaperreview';
    pluralName: 'shaperreviews';
    displayName: 'shaperreview';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    learners: Attribute.Relation<
      'api::shaperreview.shaperreview',
      'manyToMany',
      'api::applicant.applicant'
    >;
    review: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::shaperreview.shaperreview',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::shaperreview.shaperreview',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSoftskilldescriptionSoftskilldescription
  extends Schema.CollectionType {
  collectionName: 'softskilldescriptions';
  info: {
    singularName: 'softskilldescription';
    pluralName: 'softskilldescriptions';
    displayName: 'softskilldescription';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    problemsolving_description: Attribute.RichText;
    interpersonal_description: Attribute.RichText;
    communication_description: Attribute.RichText;
    leadership_description: Attribute.RichText;
    teamwork_description: Attribute.RichText;
    learners: Attribute.Relation<
      'api::softskilldescription.softskilldescription',
      'manyToMany',
      'api::applicant.applicant'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::softskilldescription.softskilldescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::softskilldescription.softskilldescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSoftskillratingSoftskillrating
  extends Schema.CollectionType {
  collectionName: 'softskillratings';
  info: {
    singularName: 'softskillrating';
    pluralName: 'softskillratings';
    displayName: 'softskillrating';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    applicants: Attribute.Relation<
      'api::softskillrating.softskillrating',
      'manyToMany',
      'api::applicant.applicant'
    >;
    problemsolving: Attribute.String & Attribute.DefaultTo<'1'>;
    interpersonal: Attribute.String & Attribute.DefaultTo<'1'>;
    teamwork: Attribute.String & Attribute.DefaultTo<'1'>;
    communication: Attribute.String & Attribute.DefaultTo<'1'>;
    leadership: Attribute.String & Attribute.DefaultTo<'1'>;
    mostimproved: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::softskillrating.softskillrating',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::softskillrating.softskillrating',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTeamTeam extends Schema.CollectionType {
  collectionName: 'teams';
  info: {
    singularName: 'team';
    pluralName: 'teams';
    displayName: 'team';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    applicants: Attribute.Relation<
      'api::team.team',
      'manyToMany',
      'api::applicant.applicant'
    >;
    teamleaders: Attribute.Relation<
      'api::team.team',
      'manyToMany',
      'api::teamleader.teamleader'
    >;
    projects: Attribute.Relation<
      'api::team.team',
      'manyToMany',
      'api::project.project'
    >;
    cohorts: Attribute.Relation<
      'api::team.team',
      'manyToMany',
      'api::cohort.cohort'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::team.team', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::team.team', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiTeamleaderTeamleader extends Schema.CollectionType {
  collectionName: 'teamleaders';
  info: {
    singularName: 'teamleader';
    pluralName: 'teamleaders';
    displayName: 'teamleader';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    firstname: Attribute.String & Attribute.Required;
    lastname: Attribute.String & Attribute.Required;
    applicants: Attribute.Relation<
      'api::teamleader.teamleader',
      'manyToMany',
      'api::applicant.applicant'
    >;
    teams: Attribute.Relation<
      'api::teamleader.teamleader',
      'manyToMany',
      'api::team.team'
    >;
    cohorts: Attribute.Relation<
      'api::teamleader.teamleader',
      'manyToMany',
      'api::cohort.cohort'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::teamleader.teamleader',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::teamleader.teamleader',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTeamworkratingdescriptionTeamworkratingdescription
  extends Schema.CollectionType {
  collectionName: 'teamworkratingdescriptions';
  info: {
    singularName: 'teamworkratingdescription';
    pluralName: 'teamworkratingdescriptions';
    displayName: 'teamworkratingdescription';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    rating1: Attribute.RichText;
    rating2: Attribute.RichText;
    rating3: Attribute.RichText;
    rating4: Attribute.RichText;
    rating5: Attribute.RichText;
    learners: Attribute.Relation<
      'api::teamworkratingdescription.teamworkratingdescription',
      'manyToMany',
      'api::applicant.applicant'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::teamworkratingdescription.teamworkratingdescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::teamworkratingdescription.teamworkratingdescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTechnicalskillTechnicalskill extends Schema.CollectionType {
  collectionName: 'technicalskills';
  info: {
    singularName: 'technicalskill';
    pluralName: 'technicalskills';
    displayName: 'techskillrating';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    applicants: Attribute.Relation<
      'api::technicalskill.technicalskill',
      'manyToMany',
      'api::applicant.applicant'
    >;
    mostimproved: Attribute.Enumeration<
      [
        'ReactJS',
        'Python',
        'Machine Learning',
        'Databases',
        'SQL',
        'CSS',
        'Django',
        'Javascript',
        'HTML',
        'Angular',
        'Bootstrap',
        'Visualisation'
      ]
    >;
    skill1: Attribute.String;
    skill2: Attribute.String;
    skill3: Attribute.String;
    skill4: Attribute.String;
    skill5: Attribute.String;
    skill6: Attribute.String;
    skill7: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::technicalskill.technicalskill',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::technicalskill.technicalskill',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTechskillsratingdescriptionTechskillsratingdescription
  extends Schema.CollectionType {
  collectionName: 'techskillsratingdescriptions';
  info: {
    singularName: 'techskillsratingdescription';
    pluralName: 'techskillsratingdescriptions';
    displayName: 'techskillsratingdescription';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    rating1: Attribute.RichText;
    rating2: Attribute.RichText;
    rating3: Attribute.RichText;
    rating4: Attribute.RichText;
    rating5: Attribute.RichText;
    learners: Attribute.Relation<
      'api::techskillsratingdescription.techskillsratingdescription',
      'manyToMany',
      'api::applicant.applicant'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::techskillsratingdescription.techskillsratingdescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::techskillsratingdescription.techskillsratingdescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWorkHistoryQuestionWorkHistoryQuestion
  extends Schema.CollectionType {
  collectionName: 'work_history_questions';
  info: {
    singularName: 'work-history-question';
    pluralName: 'work-history-questions';
    displayName: 'workHistory-question';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    question1: Attribute.RichText;
    question2: Attribute.RichText;
    question3: Attribute.RichText;
    question4: Attribute.RichText;
    question5: Attribute.RichText;
    question6: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::work-history-question.work-history-question',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::work-history-question.work-history-question',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::applicant.applicant': ApiApplicantApplicant;
      'api::candidate.candidate': ApiCandidateCandidate;
      'api::cohort.cohort': ApiCohortCohort;
      'api::communicationratingdescription.communicationratingdescription': ApiCommunicationratingdescriptionCommunicationratingdescription;
      'api::contact-detail.contact-detail': ApiContactDetailContactDetail;
      'api::interpersonalratingdescription.interpersonalratingdescription': ApiInterpersonalratingdescriptionInterpersonalratingdescription;
      'api::leadershipratingdescription.leadershipratingdescription': ApiLeadershipratingdescriptionLeadershipratingdescription;
      'api::list1.list1': ApiList1List1;
      'api::personal-question.personal-question': ApiPersonalQuestionPersonalQuestion;
      'api::problemsolvingratingdescription.problemsolvingratingdescription': ApiProblemsolvingratingdescriptionProblemsolvingratingdescription;
      'api::project.project': ApiProjectProject;
      'api::qualification-question.qualification-question': ApiQualificationQuestionQualificationQuestion;
      'api::responsibilitie.responsibilitie': ApiResponsibilitieResponsibilitie;
      'api::shaperreview.shaperreview': ApiShaperreviewShaperreview;
      'api::softskilldescription.softskilldescription': ApiSoftskilldescriptionSoftskilldescription;
      'api::softskillrating.softskillrating': ApiSoftskillratingSoftskillrating;
      'api::team.team': ApiTeamTeam;
      'api::teamleader.teamleader': ApiTeamleaderTeamleader;
      'api::teamworkratingdescription.teamworkratingdescription': ApiTeamworkratingdescriptionTeamworkratingdescription;
      'api::technicalskill.technicalskill': ApiTechnicalskillTechnicalskill;
      'api::techskillsratingdescription.techskillsratingdescription': ApiTechskillsratingdescriptionTechskillsratingdescription;
      'api::work-history-question.work-history-question': ApiWorkHistoryQuestionWorkHistoryQuestion;
    }
  }
}
