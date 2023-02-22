import { Badge, Button, Text } from "@fluentui/react-components";
import { Card, CardHeader } from "@fluentui/react-components/unstable";
import {
  BookmarkAdd24Regular,
  BookmarkOff24Filled,
} from "@fluentui/react-icons";
import { useCallback } from "react";
import { Link } from "react-router-dom";

import {
  BranchEta,
  FavouriteEta,
  FavouriteEtaRedux,
} from "../../models/favouriteEta";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  addFavouriteadEta,
  removeFavouriteadEta,
} from "../../store/favourites/slice";
import { fluentStyles } from "../../styles/fluent";
import { Countdown } from "../countdown/Countdown";

export function EtaCard(props: { eta: BranchEta; stopId?: string }) {
  const dispatch = useAppDispatch();
  const favouriteEtas: FavouriteEtaRedux = useAppSelector(
    (state) => state.favouriteEtas
  );
  const fluentStyle = fluentStyles();

  const getEtaTime = useCallback(() => {
    return props.eta.etas && props.eta.etas[0] ? props.eta.etas[0] : 0;
  }, []);

  const handleFavouriteClick = useCallback(() => {
    if (favouriteEtas.ids.includes(props.eta.id)) {
      dispatch(removeFavouriteadEta(props.eta.id));
      return;
    }

    const favouriteEta: FavouriteEta = {
      id: props.eta.id,
      stopTag: props.eta.stopTag,
      routeTag: props.eta.routeTag,
      stopId: props.stopId ?? "",
    };

    dispatch(addFavouriteadEta(favouriteEta));
  }, [favouriteEtas.ids]);

  const getFavouriteEtaButtonIcon = useCallback(() => {
    return favouriteEtas.ids.includes(props.eta.id) ? (
      <BookmarkOff24Filled />
    ) : (
      <BookmarkAdd24Regular />
    );
  }, [favouriteEtas.ids]);

  const getDestination = useCallback(() => {
    return `To: ${props.eta.destination}`;
  }, [favouriteEtas.ids]);

  const getLink = useCallback(() => {
    return props.eta.stopId ? `stops/${props.eta.stopId}` : "";
  }, []);

  return (
    <div className="etaCard">
      <Link to={getLink()} className={fluentStyle.etaLink}>
        <Card className={fluentStyle.etaCard}>
          <CardHeader
            className={fluentStyle.cardHeader}
            header={
              <div className="etaCardHeader">
                <div className="etaCardBranchTagAndDestination">
                  <div className="etaBadgeContainer">
                    <Badge
                      className={fluentStyle.cardBadge}
                      key={props.eta.routeTag}
                    >
                      {props.eta.branchTag}
                    </Badge>
                  </div>
                  <div className="etaCardDestinationInfo">
                    <Text weight="semibold">{getDestination()}</Text>
                    <Text>{props.eta.stopTitle}</Text>
                  </div>
                </div>
              </div>
            }
            action={
              <div className="etaCardCountdown">
                <Countdown minute={getEtaTime()} />
              </div>
            }
          />
        </Card>
      </Link>
      <Button
        className={fluentStyle.removeButton}
        icon={getFavouriteEtaButtonIcon()}
        onClick={handleFavouriteClick}
      />
    </div>
  );
}
