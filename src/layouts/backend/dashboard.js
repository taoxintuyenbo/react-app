import React from "react";

const Dashboard = () => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <iframe
          src="http://4.240.100.252:3000/d-solo/b2849a7d-0ef2-4f48-9b2c-85d2586df889/dashboard-01?orgId=1&from=1735664400000&to=1767200399999&timezone=browser&refresh=5s&panelId=2&__feature.dashboardSceneSolo"
          width="50%"
          height="500px"
          style={{ border: "none" }}
          title="Grafana Dashboard 2"
        ></iframe>
        <iframe
          src="http://4.240.100.252:3000/d-solo/b2849a7d-0ef2-4f48-9b2c-85d2586df889/dashboard-01?orgId=1&from=1735664400000&to=1767200399999&timezone=browser&refresh=5s&panelId=1&__feature.dashboardSceneSolo"
          width="50%"
          height="500px"
          style={{ border: "none" }}
          title="Grafana Dashboard 1"
        ></iframe>
      </div>
      <iframe
        src="http://4.240.100.252:3000/d-solo/b2849a7d-0ef2-4f48-9b2c-85d2586df889/dashboard-01?orgId=1&from=1735664400000&to=1767200399999&timezone=browser&refresh=5s&panelId=3&__feature.dashboardSceneSolo"
        width="100%"
        height="500px"
        style={{ border: "none" }}
        title="Grafana Dashboard 1"
      ></iframe>
    </div>
  );
};
export default Dashboard;
