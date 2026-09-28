import type { Server } from "./simulation/types";
import styles from "../Playground.module.css";
export function ServerNode({
  server,
  destination,
}: {
  server: Server;
  destination: boolean;
}) {
  return (
    <div className={styles.server} data-destination={destination}>
      <h4>SERVER {String(server.id).padStart(2, "0")}</h4>
      <dl>
        <div>
          <dt>ACTIVE</dt>
          <dd>{server.active}</dd>
        </div>
        <div>
          <dt>PROCESSED</dt>
          <dd>{server.processed}</dd>
        </div>
      </dl>
    </div>
  );
}
