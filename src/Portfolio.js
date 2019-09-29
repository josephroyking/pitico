import React, { useState } from 'react'
import { Row, Col, Icon, Avatar, Card } from 'antd';
import { EnhancedCard } from './EnhancedCard';
import { WalletContext } from './badger/context';
import { Meta } from 'antd/lib/list/Item';
import MoreCardOptions from './MoreCardOptions';
import Img from 'react-image';
import Jdenticon from 'react-jdenticon';

export default () => {
	const ContextValue = React.useContext(WalletContext);
	const { wallet, tokens, loading } = ContextValue;
	const [selectedToken, setSelectedToken] = useState(null);
	const SLP_TOKEN_ICONS_URL = "https://tokens.bch.sx/64";
	// TODO: function to verify if user is a token holder
	const _mockIsBatonHolder = tokenId => true;

	return (
		<Row type="flex" gutter={8} style={{ position:'relative' }}>
			{loading ? (
				Array.from({ length: 4 }).map((v, i) => (
					<Col>
						<EnhancedCard
							loading
							key={i}
							style={{ width: 300, marginTop: '8px' }}
							bordered={false}
						>
							<Meta
								avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
								title="Token symbol"
								description="Token description"
							/>
						</EnhancedCard>
					</Col>
				))
			) : tokens.map(token => (
				<Col>
					<EnhancedCard
						loading={!token.info}
						expand={selectedToken && token.tokenId === selectedToken.tokenId}
						onClick={() => setSelectedToken(!selectedToken || token.tokenId !== selectedToken.tokenId ? token : null)}
						key={token.tokenId}
						style={{ width: 300, marginTop: '8px', textAlign: 'left' }}
						onClose={() => setSelectedToken(null)}
						actions={
							(
							_mockIsBatonHolder()
							&&
							[
							<span><Icon  type="printer"  key="printer"/> Mint</span>,
							<span><Icon  type="interaction" key="interaction"/> Transfer</span>,
							<MoreCardOptions hoverContent="teste"><span><Icon style={{ fontSize: "18px" }}type="ellipsis" key="ellipsis"/></span></MoreCardOptions>,
						]) || <span><Icon type="interaction" key="interaction"/> Transfer</span>
					}
					>
					<Meta
						avatar={<Img
									src={`${SLP_TOKEN_ICONS_URL}/${token.tokenId}.png`} 
									unloader={<Jdenticon size="64" value={token.tokenId}/>}/>}
						title={token.info && token.info.symbol}
						description={token.info && token.info.name} />
				</EnhancedCard>
				</Col>
			))}
		</Row>
	)
};
