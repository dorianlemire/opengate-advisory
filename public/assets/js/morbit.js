/* Feature illustrations only. Never connects to Studio or uses customer data. */
(() => {
  'use strict';
  const groups = [
    { selector: '.estate-scene', key: 'estate', state: 'active', output: '.estate-context', copy: {
      devices: 'Bring connected-device status and health into the support conversation.',
      communications: 'See communication platforms, room systems and user-level context together.',
      spaces: 'Connect room calendars and usage information to the places people work.',
      sensors: 'Connect environmental and occupancy readings to their building, floor or room.'
    } },
    { selector: '.rooms-scene', key: 'roomView', output: '.room-context', copy: {
      calendar: 'Connect the booking calendar to the meeting space.',
      occupancy: 'Compare booked time with how desks and rooms are used.',
      environment: 'Add sensor context to the room’s operational picture.'
    } },
    { selector: '.sensor-scene', key: 'sensor', output: '.sensor-context', copy: {
      air: 'CO₂ readings give teams another view of a room’s environment.',
      comfort: 'Temperature and humidity add context to workplace conditions.',
      presence: 'Desk occupancy and motion help make space usage visible.'
    } }
  ];
  groups.forEach(config => {
    const group = document.querySelector(config.selector);
    if (!group) return;
    const buttons = [...group.querySelectorAll('button[aria-pressed]')];
    const select = button => {
      const key = button.dataset[config.key];
      if (!config.copy[key]) return;
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      group.dataset[config.state || config.key] = key;
      group.querySelector(config.output).textContent = config.copy[key];
    };
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => select(button));
      button.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
        if (event.key === 'ArrowLeft') next = (index + buttons.length - 1) % buttons.length;
        if (next !== undefined) { event.preventDefault(); select(buttons[next]); buttons[next].focus(); }
      });
    });
  });
})();
