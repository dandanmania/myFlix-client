import React from "react";
import { connect } from "react-redux";

import Form from 'react-bootstrap/Form';

import { setFilter } from "../../actions/actions";

import './visibility-filter-input.scss'
import { Card } from "react-bootstrap";

function VisibilityFilterInput(props) {
    return <Card className="mt-2 px-2 pb-2 searchcolor">
        <Form.Control 
        onChange={e => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder="Filter Movies"
        className="mt-2"
    />
    </Card>
}

export default connect(
    null,
    { setFilter }
)(VisibilityFilterInput);