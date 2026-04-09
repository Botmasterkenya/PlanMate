/**
 * PlanMate Global JavaScript
 */

// -------------------------------------------------------------
// Toast Notification System
// -------------------------------------------------------------
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let iconClass = 'ph-check-circle';
  let color = '#10b981'; // Green

  if (type === 'error') {
    iconClass = 'ph-warning-circle';
    color = '#ef4444'; // Red
  } else if (type === 'info') {
    iconClass = 'ph-info';
    color = 'var(--accent-primary)'; 
  }

  toast.style.borderLeftColor = color;

  toast.innerHTML = `
    <i class="ph ${iconClass}" style="font-size: 24px; color: ${color};"></i>
    <span style="font-size: 15px; font-weight: 500;">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode === container) {
      container.removeChild(toast);
    }
  }, 4500);
}

// -------------------------------------------------------------
// Events Management (LocalStorage)
// -------------------------------------------------------------

// Load Events from LocalStorage
function getEvents() {
  const events = localStorage.getItem('planmate_events');
  return events ? JSON.parse(events) : [];
}

// Render Events on events.html
function renderEvents() {
  const grid = document.getElementById('eventsGrid');
  if (!grid) return;

  const events = getEvents();
  grid.innerHTML = '';

  if (events.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <i class="ph ph-calendar-x"></i>
        <h3>No Events Yet</h3>
        <p>You haven't created any events. Click 'Create Event' to get started.</p>
      </div>
    `;
    return;
  }

  events.forEach((event, index) => {
    // Format Date securely avoiding complex logic
    let dateStr = "TBD";
    if(event.date) {
        const d = new Date(event.date);
        dateStr = d.toLocaleDateString() + ' • ' + d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }

    const card = document.createElement('div');
    card.className = 'feature-box card';
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
        <h3>${event.name}</h3>
        <span class="badge ${event.attending ? 'badge-active' : 'badge-pending'}">${event.attending ? 'Attending' : 'Pending RSVP'}</span>
      </div>
      <p style="margin-bottom: 20px;"><i class="ph ph-calendar"></i> ${dateStr}</p>
      <p style="margin-bottom: 20px; font-size: 14px;">${event.description}</p>
      
      <div style="display: flex; gap: 10px;">
        <button class="btn-primary" style="flex: 1; padding: 8px 12px; font-size: 13px;" onclick="handleRSVP(${index}, true)">Confirm RSVP</button>
        <button class="btn-secondary" style="flex: 1; padding: 8px 12px; font-size: 13px;" onclick="handleRSVP(${index}, false)">Decline</button>
        <button class="btn-secondary" style="padding: 8px 10px;" onclick="deleteEvent(${index})" title="Delete Event"><i class="ph ph-trash" style="color:#ef4444; margin:0;"></i></button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Modal Logic
function openEventModal() {
  const modal = document.getElementById('eventModal');
  if (modal) modal.classList.add('active');
}

function closeEventModal() {
  const modal = document.getElementById('eventModal');
  if (modal) modal.classList.remove('active');
}

// Event Creation Submission
const createEventForm = document.getElementById('createEventForm');
if (createEventForm) {
  createEventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('eventName').value;
    const date = document.getElementById('eventDate').value;
    const desc = document.getElementById('eventDescription').value;

    const newEvent = {
      name: name,
      date: date,
      description: desc,
      attending: false
    };

    const events = getEvents();
    events.push(newEvent);
    localStorage.setItem('planmate_events', JSON.stringify(events));

    closeEventModal();
    createEventForm.reset();
    showToast('Event created successfully!', 'success');
    renderEvents();
  });
}

// Handle RSVP specific to localstorage array
window.handleRSVP = function(index, isAttending) {
  const events = getEvents();
  if(events[index]) {
    events[index].attending = isAttending;
    localStorage.setItem('planmate_events', JSON.stringify(events));
    showToast(isAttending ? 'Successfully RSVP\'d as Attending!' : 'You have declined this event.', isAttending ? 'success' : 'info');
    renderEvents();
  }
};

window.deleteEvent = function(index) {
  if(confirm("Are you sure you want to delete this event?")) {
    const events = getEvents();
    events.splice(index, 1);
    localStorage.setItem('planmate_events', JSON.stringify(events));
    showToast('Event deleted', 'info');
    renderEvents();
  }
};


// -------------------------------------------------------------
// Interactive Toggles
// -------------------------------------------------------------

// Task Toggle Handler
function toggleTask(taskElement) {
  const icon = taskElement.querySelector('.ph-circle, .ph-check-circle');
  const title = taskElement.querySelector('h4');
  
  if (!icon) return;

  if (icon.classList.contains('ph-circle')) {
    icon.classList.replace('ph-circle', 'ph-check-circle');
    icon.style.color = '#10b981';
    title.style.textDecoration = 'line-through';
    title.style.opacity = '0.7';
    showToast('Task marked as completed!');
  } else {
    icon.classList.replace('ph-check-circle', 'ph-circle');
    icon.style.color = 'var(--text-secondary)';
    title.style.textDecoration = 'none';
    title.style.opacity = '1';
  }
}

// -------------------------------------------------------------
// Initialization
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  renderEvents();
});