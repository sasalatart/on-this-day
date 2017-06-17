import PropTypes from 'prop-types';

const keyword = PropTypes.shape({
  text: PropTypes.string,
  href: PropTypes.string,
});

const keywords = PropTypes.arrayOf(keyword);

const episode = PropTypes.shape({
  data: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  kw: keywords,
});

const episodes = PropTypes.arrayOf(episode);

export default {
  keyword,
  keywords,
  episode,
  episodes,
};
