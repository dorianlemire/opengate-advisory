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
      if (config.key === 'estate') {
        const descriptions = {
          devices: ['Know what needs attention.', 'Bring UC devices, connected systems and displays into the same view. Review device health, identify alerts and decide where your team should look next.', ['Device categories and asset context.','Health, status and alerts together.','A common starting point for IT and AV.']],
          communications: ['Put communications in context.', 'Teams, Zoom and room systems are part of the workplace estate. Bring supported platforms into a shared operational view and connect the conversation to the devices people depend on.', ['Supported communication platforms.','Room systems and user context.','One operational conversation.']],
          spaces: ['Connect the room to the estate.', 'Smart-building and asset views connect technology to a physical location. Move from the building to the floor or meeting space, then investigate the relevant system.', ['Building, floor and room context.','Bookings and workplace usage.','A clearer route to the relevant detail.']],
          sensors: ['Look beyond the equipment.', 'Environmental and occupancy sensors add context to a room. Review supported CO₂, temperature, humidity and presence information within your deployment.', ['Environmental readings where supported.','Occupancy and motion context.','Connected to the room they belong to.']]
        };
        const panel=group.closest('.morbit-panel');
        panel.querySelector('.estate-detail-heading').textContent=descriptions[key][0];
        panel.querySelector('.estate-detail-body').textContent=descriptions[key][1];
        panel.querySelectorAll('.feature-list li').forEach((item,index)=>item.textContent=descriptions[key][2][index]);
      }
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
