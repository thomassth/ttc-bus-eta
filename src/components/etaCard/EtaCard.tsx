import { Badge, Button, Text } from "@fluentui/react-components";
import { Card, CardHeader } from "@fluentui/react-components/unstable";
import {
  BookmarkAdd24Regular,
  BookmarkOff24Filled,
} from "@fluentui/react-icons";
import { t } from "i18next";
import { useCallback } from "react";
import { Link } from "react-router-dom";

import { BranchEta, FavouriteEtaRedux } from "../../models/etaObjects";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  addFavouriteadEta,
  removeFavouriteadEta,
} from "../../store/favourites/slice";
import { fluentStyles } from "../../styles/fluent";
import { CountdownSec } from "../countdown/CountdownSec";

export function EtaCard(props: { eta: BranchEta; stopId?: string }) {
  const dispatch = useAppDispatch();
  const favouriteEtas: FavouriteEtaRedux = useAppSelector(
    (state) => state.favouriteEtas
  );
  const fluentStyle = fluentStyles();

  const getTime = useCallback(() => {
    return props.eta.etas && props.eta.etas[0] ? props.eta.etas[0] : 0;
  }, []);

  const handleFavouriteClick = useCallback(() => {
    console.log(props.eta);
    const eta = {
      id: props.eta.id,
      stopTag: props.eta.stopTag,
      routeTag: props.eta.routeTag,
      destination: props.eta.destination ?? "",
      routeTitle: props.eta.routeTitle,
      stopId: props.stopId ?? "",
    };
    favouriteEtas.ids.includes(props.eta.id)
      ? dispatch(removeFavouriteadEta(eta.id))
      : dispatch(addFavouriteadEta(eta));

    console.log("HEHE");
    console.log(favouriteEtas);
  }, [favouriteEtas.ids]);

  const getFavouriteEtaButtonIcon = useCallback(() => {
    console.log(favouriteEtas.ids.includes(props.eta.id));
    return favouriteEtas.ids.includes(props.eta.id) ? (
      <BookmarkOff24Filled />
    ) : (
      <BookmarkAdd24Regular />
    );
  }, [favouriteEtas.ids]);

  return (
    <div className="etaCard">
      <Link to={props.eta.stopId ? `stops/${props.eta.stopId}` : ""}>
        <Card className="clickableCard">
          <CardHeader
            header={
              <div className="etaCardHeader">
                <div className="etaCardBranchTagAndDestination">
                  <div>
                    <Badge
                      className={`${fluentStyle.cardBadge}`}
                      key={props.eta.routeTag}
                    >
                      {props.eta.branchTag}
                    </Badge>
                  </div>
                  <div className="etaCardDestinationInfo">
                    <Text weight="semibold">To: {props.eta.destination}</Text>
                    <Text>{props.eta.stopTitle}</Text>
                  </div>
                </div>
              </div>
            }
            action={
              <div className="etaCardCountdown">
                <CountdownSec second={getTime()} />
              </div>
            }
          />
        </Card>
      </Link>
      <Button
        className="removeButton"
        title={t("buttons.delete") ?? ""}
        icon={getFavouriteEtaButtonIcon()}
        onClick={handleFavouriteClick}
      />
    </div>
  );
}
