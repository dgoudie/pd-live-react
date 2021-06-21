// Define Action Types
export const TOGGLE_DISPLAY_QUERY_SETTINGS_REQUESTED = "TOGGLE_DISPLAY_QUERY_SETTINGS_REQUESTED";
export const TOGGLE_DISPLAY_QUERY_SETTINGS_COMPLETED = "TOGGLE_DISPLAY_QUERY_SETTINGS_COMPLETED";

export const UPDATE_QUERY_SETTING_SINCE_DATE_REQUESTED = "UPDATE_QUERY_SETTING_SINCE_DATE_REQUESTED";
export const UPDATE_QUERY_SETTING_SINCE_DATE_COMPLETED = "UPDATE_QUERY_SETTING_SINCE_DATE_COMPLETED";

export const UPDATE_QUERY_SETTING_INCIDENT_STATUS_REQUESTED = "UPDATE_QUERY_SETTING_INCIDENT_STATUS_REQUESTED";
export const UPDATE_QUERY_SETTING_INCIDENT_STATUS_COMPLETED = "UPDATE_QUERY_SETTING_INCIDENT_STATUS_COMPLETED";

export const UPDATE_QUERY_SETTING_INCIDENT_URGENCY_REQUESTED = "UPDATE_QUERY_SETTING_INCIDENT_URGENCY_REQUESTED";
export const UPDATE_QUERY_SETTING_INCIDENT_URGENCY_COMPLETED = "UPDATE_QUERY_SETTING_INCIDENT_URGENCY_COMPLETED";

// TODO: Add logic to sagas, reducers, and QuerySettingsComponent
export const UPDATE_QUERY_SETTING_INCIDENT_PRIORITY_REQUESTED = "UPDATE_QUERY_SETTING_INCIDENT_PRIORITY_REQUESTED";
export const UPDATE_QUERY_SETTING_INCIDENT_PRIORITY_COMPLETED = "UPDATE_QUERY_SETTING_INCIDENT_PRIORITY_COMPLETED";

export const UPDATE_QUERY_SETTINGS_TEAMS_REQUESTED = "UPDATE_QUERY_SETTINGS_TEAMS_REQUESTED";
export const UPDATE_QUERY_SETTINGS_TEAMS_COMPLETED = "UPDATE_QUERY_SETTINGS_TEAMS_COMPLETED";

export const UPDATE_QUERY_SETTINGS_SERVICES_REQUESTED = "UPDATE_QUERY_SETTINGS_SERVICES_REQUESTED";
export const UPDATE_QUERY_SETTINGS_SERVICES_COMPLETED = "UPDATE_QUERY_SETTINGS_SERVICES_COMPLETED";

// Define Actions
export const toggleDisplayQuerySettings = () => ({
  type: TOGGLE_DISPLAY_QUERY_SETTINGS_REQUESTED
});

export const updateQuerySettingsSinceDate = (sinceDate) => ({
  type: UPDATE_QUERY_SETTING_SINCE_DATE_REQUESTED,
  sinceDate
});

export const updateQuerySettingsIncidentStatus = (incidentStatus) => ({
  type: UPDATE_QUERY_SETTING_INCIDENT_STATUS_REQUESTED,
  incidentStatus
});

export const updateQuerySettingsIncidentUrgency = (incidentUrgency) => ({
  type: UPDATE_QUERY_SETTING_INCIDENT_URGENCY_REQUESTED,
  incidentUrgency
});

export const updateQuerySettingsIncidentPriority = (incidentPriority) => ({
  type: UPDATE_QUERY_SETTING_INCIDENT_PRIORITY_REQUESTED,
  incidentPriority
});

export const updateQuerySettingsTeams = (teamIds) => ({
  type: UPDATE_QUERY_SETTINGS_TEAMS_REQUESTED,
  teamIds
});

export const updateQuerySettingsServices = (serviceIds) => ({
  type: UPDATE_QUERY_SETTINGS_SERVICES_REQUESTED,
  serviceIds
});