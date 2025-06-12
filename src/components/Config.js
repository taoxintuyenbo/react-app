import React, { useEffect, useState } from "react";
import ConfigService from "../services/ConfigService";
const Config = () => {
  // State to hold config data
  const [configData, setConfigData] = useState(null);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchConfigData = async () => {
      try {
        const response = await ConfigService.index();

        setConfigData(response.configs[0]);
      } catch (error) {
        console.error("Error fetching config data:", error);
      }
    };

    fetchConfigData();
  }, []);

  if (!configData) return <div>Loading...</div>;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">{configData.site_name}</h3>
      <ul className="space-y-2">
        <li>
          <i className="fas fa-map-marker-alt"></i> {configData.address}
        </li>
        <li>
          <i className="fas fa-phone-alt"></i> {configData.phones}
        </li>
        <li>
          <i className="fas fa-phone"></i> Hotline: {configData.hotline}
        </li>
        <li>
          <i className="fas fa-envelope"></i> {configData.email}
        </li>
        <li>
          <i className="fab fa-facebook"></i>{" "}
          <a
            href={configData.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </li>
        <li>
          <i className="fas fa-phone-square"></i> Zalo: {configData.zalo}
        </li>
      </ul>
    </div>
  );
};
export default Config;
