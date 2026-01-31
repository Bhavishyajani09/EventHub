import React, { useState } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { eventsData, bookings } from "../lib/data";


export default function ReportsAnalytics() {
  const [timeRange, setTimeRange] = useState("Last 30 Days");
  const [selectedEvent, setSelectedEvent] = useState("All Events");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 🔹 Filter logic (example)
  const applyFilters = () => {
    console.log("Filters Applied 👇");
    console.log({
      timeRange,
      selectedEvent,
      startDate,
      endDate,
    });
  };

  const exportCSV = () => {
    console.log("Exporting CSV...");
  };

  const exportPDF = () => {
    console.log("Exporting PDF...");
  }; 


  // // ✅ only confirmed bookings
  // const confirmedBookings = bookings.filter(
  //   (b) => b.status && b.status.toLowerCase() === "confirmed"
  // );

  // // ✅ total tickets sold
  // const totalTicketsSold = confirmedBookings.reduce(
  //   (sum, b) => sum + Number(b.tickets),
  //   0
  // );

  // // ✅ total revenue
  // const totalRevenue = confirmedBookings.reduce(
  //   (sum, b) => sum + Number(b.tickets) * Number(b.price),
  //   0
  // );

  // // ✅ average ticket price
  // const avgTicketPrice =
  //   totalTicketsSold === 0
  //     ? 0
  //     : Math.round(totalRevenue / totalTicketsSold);

  // // ✅ conversion rate
  // const conversionRate =
  //   bookings.length === 0
  //     ? 0
  //     : ((confirmedBookings.length / bookings.length) * 100).toFixed(1);


  /* ================= EVENTS BASED ================= */

  // 🎟 Total Tickets Sold
  const totalTicketsSold = eventsData.reduce(
    (sum, e) => sum + Number(e.sold || 0),
    0
  );

  // 🎫 Total Tickets Available
  const totalTickets = eventsData.reduce(
    (sum, e) => sum + Number(e.total || 0),
    0
  );

  // 📊 Conversion Rate (Sold / Total)
  const conversionRate =
    totalTickets === 0
      ? 0
      : ((totalTicketsSold / totalTickets) * 100).toFixed(1);

  /* ================= BOOKINGS BASED ================= */

  const confirmedBookings = bookings.filter(
    (b) => b.status?.toLowerCase() === "confirmed"
  );


  
  // 🎟 Ticket type wise count (from bookings)
const ticketTypeCount = confirmedBookings.reduce((acc, b) => {
  const type = b.category;              // Silver / Gold / VIP
  const qty = Number(b.tickets || 0);   // no of tickets

  acc[type] = (acc[type] || 0) + qty;
  return acc;
}, {});

// 🎟 Total confirmed tickets
const totalConfirmedTickets = Object.values(ticketTypeCount).reduce(
  (sum, val) => sum + val,
  0
);

// 📊 Convert to percentage
const ticketDistribution = Object.entries(ticketTypeCount).map(
  ([type, count]) => ({
    label: type,
    percent:
      totalConfirmedTickets === 0
        ? 0
        : Math.round((count / totalConfirmedTickets) * 100),
  })
);


  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <p className="text-gray-500">
          Analyze your event performance and trends
        </p>
      </div>

      {/* Filters */}
      {/* <div className="flex flex-wrap gap-3 items-center bg-white p-4 rounded-xl border">
        <select className="input w-40">
          <option>Last 30 Days</option>
          <option>Last 7 Days</option>
          <option>This Year</option>
        </select>

        <select className="input w-40">
          <option>All Events</option>
        </select>

        <input type="date" className="input w-40" />
        <input type="date" className="input w-40" />

        <button className="btn-outline flex items-center gap-2">
          <Download size={16} /> Export CSV
        </button>

        <button className="btn-outline flex items-center gap-2">
          <Download size={16} /> Export PDF
        </button>
      </div> */}


<div className="bg-white p-4 rounded-xl border space-y-4">

      {/* 🔹 Top Row – 4 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

        {/* Time Range */}
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border rounded-lg w-full"
        >
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Year</option>
        </select>

        {/* Event Filter */}
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="px-3 py-2 border rounded-lg w-full"
        >
          <option>All Events</option>
          {eventsData.map((event) => (
            <option key={event.id} value={event.title}>
              {event.title}
            </option>
          ))}
        </select>

        {/* Start Date */}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="px-3 py-2 border rounded-lg w-full"
        />

        {/* End Date */}
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="px-3 py-2 border rounded-lg w-full"
        />

      </div>

      {/* 🔹 Bottom Row – Actions */}
      <div className="flex flex-wrap gap-3 justify-end">

        <button
          onClick={applyFilters}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Apply Filters
        </button>

        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          <Download size={16} /> Export CSV
        </button>

        <button
          onClick={exportPDF}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          <Download size={16} /> Export PDF
        </button>

      </div>
    </div>

     



      {/* Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value="$124,580"
          change="18%"
        />
        <StatCard
          title="Tickets Sold"
          value="8,542"
          change="23%"
        />
        <StatCard
          title="Avg Ticket Price"
          value="$89"
          subtitle="Across all events"
        />
        <StatCard
          title="Conversion Rate"
          value="18.5%"
          change="2.3%"
        />
      </div> */}
 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

      <StatCard
        title="Total Tickets Sold"
        value={totalTicketsSold}
        change="Live"
      />

      <StatCard
        title="Total Capacity"
        value={totalTickets}
        subtitle="Across all events"
      />

      <StatCard
        title="Remaining Tickets"
        value={totalTickets - totalTicketsSold}
      />

      <StatCard
        title="Conversion Rate"
        value={`${conversionRate}%`}
      />

    </div>




      {/* Booking Funnel */}
      {/* <div className="bg-white p-6 rounded-xl border">
        <h2 className="font-semibold mb-4">Booking Funnel</h2>

        <FunnelRow label="Page Views" value="10,000" percent="100%" />
        <FunnelRow label="Add to Cart" value="3,500" percent="35%" />
        <FunnelRow label="Checkout" value="2,100" percent="21%" />
        <FunnelRow label="Purchase" value="1,850" percent="18.5%" />

        <p className="text-sm text-gray-500 mt-4">
          Overall Conversion Rate: <b>18.5%</b> from page view to completed purchase
        </p>
      </div> */}

      {/* Ticket Distribution */}
      {/* <div className="bg-white p-6 rounded-xl border">
        <h2 className="font-semibold mb-4">
          Ticket Type Distribution
        </h2>

        <Distribution label="Silver" percent={45} />
        <Distribution label="Gold" percent={35} />
        <Distribution label="VIP" percent={20} />
      </div> */}

      {/* <div className="bg-white p-6 rounded-xl border">
  <h2 className="font-semibold mb-4">
    Ticket Type Distribution
  </h2>
{ticketDistribution.length === 0 ? (
  <p className="text-sm text-gray-500">
    No ticket data available
  </p>
) : (
  ticketDistribution.map((item) => (
    <Distribution
      key={item.label}
      label={item.label}
      percent={item.percent}
    />
  ))
)}

</div> */}




<div className="grid grid-cols-1 md:grid-cols-12 gap-4">

  {/* Left Column: Ticket Type Distribution (smaller) */}
  <div className="md:col-span-4 bg-white p-6 rounded-xl border">
    <h2 className="font-semibold mb-4">
      Ticket Type Distribution
    </h2>

    {ticketDistribution.length === 0 ? (
      <p className="text-sm text-gray-500">
        No ticket data available
      </p>
    ) : (
      ticketDistribution.map((item) => (
        <Distribution
          key={item.label}
          label={item.label}
          percent={item.percent}
        />
      ))
    )}
  </div>

  {/* Right Column: Booking Funnel (bigger) */}
  <div className="md:col-span-8 bg-white p-6 rounded-xl border">
    <h2 className="font-semibold mb-4">Booking Funnel</h2>

    <FunnelRow label="Page Views" value="10,000" percent="100%" />
    <FunnelRow label="Add to Cart" value="3,500" percent="35%" />
    <FunnelRow label="Checkout" value="2,100" percent="21%" />
    <FunnelRow label="Purchase" value="1,850" percent="18.5%" />

    <p className="text-sm text-gray-500 mt-4">
      Overall Conversion Rate: <b>18.5%</b> from page view to completed purchase
    </p>
  </div>

</div>



      {/* Insights */}
      <div className="bg-white p-6 rounded-xl border">
        <h2 className="font-semibold mb-3">Key Insights</h2>

        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
          <li>
            Your conversion rate improved by <b>2.3%</b> this period.
          </li>
          <li>
            Gold tickets are best sellers at <b>35%</b> of total sales.
          </li>
          <li>
            Most drop-off occurs between <b>Add to Cart</b> and <b>Checkout</b>.
          </li>
        </ul>
      </div>

      {/* Styles */}
      <style>
        {`
          .input {
            padding: 0.5rem 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
          }
          .btn-outline {
            padding: 0.5rem 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            background: white;
          }
        `}
      </style>
    </div>
  );
}

/* ================= Components ================= */

// function StatCard({ title, value, change, subtitle }) {
//   return (
//     <div className="bg-white p-4 rounded-xl border">
//       <p className="text-sm text-gray-500">{title}</p>
//       <h3 className="text-2xl font-bold">{value}</h3>

//       {change && (
//         <p className="text-green-600 text-sm flex items-center gap-1">
//           <ArrowUpRight size={14} /> {change} vs previous period
//         </p>
//       )}

//       {subtitle && (
//         <p className="text-gray-400 text-sm">{subtitle}</p>
//       )}
//     </div>
//   );
// }


function StatCard({ title, value, change, subtitle }) {
  return (
    <div className="bg-white p-4 rounded-xl border">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>

      {change && (
        <p className="text-green-600 text-sm flex items-center gap-1">
          <ArrowUpRight size={14} /> {change}
        </p>
      )}

      {subtitle && (
        <p className="text-gray-400 text-sm">{subtitle}</p>
      )}
    </div>
  );
}

function FunnelRow({ label, value, percent }) {
  return (
    <div className="flex justify-between py-2 border-b last:border-0">
      <span>{label}</span>
      <span className="font-medium">
        {value} <span className="text-gray-400">({percent})</span>
      </span>
    </div>
  );
}

// function Distribution({ label, percent }) {
//   return (
//     <div className="mb-3">
//       <div className="flex justify-between text-sm mb-1">
//         <span>{label}</span>
//         <span>{percent}%</span>
//       </div>
//       <div className="h-2 bg-gray-200 rounded">
//         <div
//           className="h-2 bg-indigo-600 rounded"
//           style={{ width: `${percent}%` }}
//         />
//       </div>
//     </div>
//   );
// }


function Distribution({ label, percent }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded">
        <div
          className="h-2 bg-indigo-600 rounded"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

