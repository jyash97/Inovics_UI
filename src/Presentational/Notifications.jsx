import React from 'react';

const Notifications = props =>
  props.notifications.map(msg => (
    <div key={msg} className="alert mx-auto alert-success">
      {msg}
    </div>
  ));

export default Notifications;
