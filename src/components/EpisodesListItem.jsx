import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { blue900, transparent } from 'material-ui/styles/colors';
import generateKeywordsText from '../utils/keywords';

const EpisodeListItem = (props) => {
  const { _id, data, year, kw } = props;
  const leftAvatar = (
    <Avatar color={blue900} backgroundColor={transparent}>
      <p className="centered-text">{year}</p>
    </Avatar>
  );

  return (
    <div key={_id}>
      <Divider />
      <ListItem
        leftAvatar={leftAvatar}
        primaryText={data}
        secondaryText={generateKeywordsText(kw)}
        disabled
      />
    </div>
  );
};

EpisodeListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  kw: PropTypes.arrayOf(PropTypes.shape({ text: PropTypes.string, href: PropTypes.string })),
};

EpisodeListItem.defaultProps = {
  kw: undefined,
};

export default EpisodeListItem;
