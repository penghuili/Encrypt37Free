import { connect } from 'react-redux';
import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import EncryptText from './EncryptText';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onToast: sharedActionCreators.setToast,
};

export default connect(mapStateToProps, mapDispatchToProps)(EncryptText);
