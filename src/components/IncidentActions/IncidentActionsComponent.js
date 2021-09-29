import { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownButton,
  ButtonGroup
} from 'react-bootstrap';

import "./IncidentActionsComponent.css";

import {
  acknowledge,
  escalate,
  snooze,
  toggleDisplayCustomSnoozeModal,
  resolve,
  updatePriority,
  toggleDisplayAddNoteModal,
} from "redux/incident_actions/actions";

import {
  TRIGGERED,
  ACKNOWLEDGED,
  SNOOZE_TIMES,
  filterIncidentsByField,
  HIGH
} from "util/incidents";

import { getObjectsFromListbyKey } from "util/helpers";

const IncidentActionsComponent = ({
  incidentTableSettings,
  incidentActions,
  priorities,
  escalationPolicies,
  acknowledge,
  escalate,
  reassign,
  addResponders,
  snooze,
  toggleDisplayCustomSnoozeModal,
  resolve,
  updatePriority,
  toggleDisplayAddNoteModal,
  runAction
}) => {

  let { selectedCount, selectedRows } = incidentTableSettings;
  let unresolvedIncidents = filterIncidentsByField(selectedRows, "status", [TRIGGERED, ACKNOWLEDGED]);
  let highUrgencyIncidents = filterIncidentsByField(selectedRows, "urgency", [HIGH]);

  // Determine ability of each button based on selected items
  let enableActions = unresolvedIncidents.length > 0 ? false : true;
  let enablePostActions = selectedCount > 0 ? false : true;
  let enablePostSingularAction = selectedCount === 1 ? false : true;
  let enableEscalationAction = (selectedCount === 1 && highUrgencyIncidents.length) ? false : true;

  // Create internal variables and state for escalate
  let selectedEscalationPolicyId = selectedCount > 0 ? selectedRows[0]["escalation_policy"]["id"] : null;
  let selectedEscalationPolicy = getObjectsFromListbyKey(escalationPolicies, "id", selectedEscalationPolicyId)[0];
  let selectedEscalationRules = selectedEscalationPolicy ? selectedEscalationPolicy.escalation_rules.slice(0).reverse() : [];

  const [displayEscalate, toggleEscalate] = useState(false);
  useEffect(() => {
    toggleEscalate(false);
  }, [enableEscalationAction]);


  // Create internal state for snooze - disable toggle irrespective of actions
  const [displaySnooze, toggleSnooze] = useState(false);
  useEffect(() => {
    toggleSnooze(false);
  }, [enableActions]);

  // Create internal state for priorities
  const [displayPriority, togglePriority] = useState(false);
  useEffect(() => {
    togglePriority(false);
  }, [enableActions]);

  return (
    <div>
      <Container className="incident-actions-ctr" fluid>
        <Row>
          <Col>
            <Button
              className="action-button"
              variant="outline-dark"
              onClick={() => acknowledge(selectedRows)}
              disabled={enableActions}
            >
              Acknowledge
            </Button>
            <DropdownButton
              as={ButtonGroup}
              className="action-button"
              variant="outline-dark"
              drop="up"
              title="Escalate"
              disabled={enableEscalationAction}
              show={displayEscalate}
              onClick={() => toggleEscalate(!displayEscalate)}
            >
              {selectedEscalationRules.map((escalation_rule, idx) => {
                let escalationLevel = selectedEscalationRules.length - idx;
                return (
                  <Dropdown.Item
                    key={escalation_rule.id}
                    variant="outline-dark"
                    onClick={() => escalate(selectedRows, escalationLevel)}
                  >
                    {`Level ${escalationLevel}: ${escalation_rule.targets.map(t => t.summary).join(", ")}`}
                  </Dropdown.Item>
                )
              })}
            </DropdownButton>
            <Button
              className="action-button"
              variant="outline-dark"
              disabled={enableActions}
            >
              Reassign
            </Button>
            <Button
              className="action-button"
              variant="outline-dark"
              disabled={enableActions}
            >
              Add Responders
            </Button>
            <DropdownButton
              as={ButtonGroup}
              className="action-button"
              variant="outline-dark"
              drop="up"
              title="Snooze"
              disabled={enableActions}
              show={displaySnooze}
              onClick={() => toggleSnooze(!displaySnooze)}
            >
              {Object.keys(SNOOZE_TIMES).map(duration =>
                <Dropdown.Item
                  key={duration}
                  variant="outline-dark"
                  onClick={() => snooze(selectedRows, duration)}
                >
                  {duration}
                </Dropdown.Item>
              )}
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => toggleDisplayCustomSnoozeModal()}>
                Custom
              </Dropdown.Item>
            </DropdownButton>
            <Button
              className="action-button"
              variant="outline-dark"
              disabled={enableActions}
              onClick={() => resolve(selectedRows)}
            >
              Resolve
            </Button>
          </Col>
          <Col sm={{ span: 3.5 }}>
            <DropdownButton
              as={ButtonGroup}
              className="action-button"
              variant="outline-dark"
              drop="up"
              title="Update Priority"
              disabled={enableActions}
              show={displayPriority}
              onClick={() => togglePriority(!displayPriority)}
            >
              {priorities.map(priority =>
                <Dropdown.Item
                  key={priority.id}
                  variant="outline-dark"
                  onClick={() => updatePriority(selectedRows, priority.id)}
                >
                  <p
                    style={{
                      backgroundColor: `#${priority.color}`,
                      color: "white",
                    }}
                    className="priority-label-dropdown"
                  >
                    {priority.name}
                  </p>
                </Dropdown.Item>
              )}
            </DropdownButton>
            <Button
              className="action-button"
              variant="outline-dark"
              onClick={() => toggleDisplayAddNoteModal()}
              disabled={enablePostActions}
            >
              Add Note
            </Button>
            <Button
              className="action-button"
              variant="outline-dark"
              disabled={enablePostSingularAction}
            >
              Run Action
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => ({
  incidentTableSettings: state.incidentTableSettings,
  incidentActions: state.incidentActions,
  priorities: state.priorities.priorities,
  escalationPolicies: state.escalationPolicies.escalationPolicies,
});

const mapDispatchToProps = (dispatch) => ({
  acknowledge: (incidents) => dispatch(acknowledge(incidents)),
  escalate: (incidents, escalationLevel) => dispatch(escalate(incidents, escalationLevel)),
  reassign: (incidents) => () => { }, // To be implemented as action
  addResponders: (incidents) => () => { }, // To be implemented as action
  snooze: (incidents, duration) => dispatch(snooze(incidents, duration)),
  toggleDisplayCustomSnoozeModal: () => dispatch(toggleDisplayCustomSnoozeModal()),
  resolve: (incidents) => dispatch(resolve(incidents)),
  updatePriority: (incidents, priorityId) => dispatch(updatePriority(incidents, priorityId)),
  toggleDisplayAddNoteModal: () => dispatch(toggleDisplayAddNoteModal()),
  runAction: (incidents) => () => { }, // To be implemented as action
});

export default connect(mapStateToProps, mapDispatchToProps)(IncidentActionsComponent);