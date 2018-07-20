import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import InputGroup, {
	InputGroupAppend,
	InputGroupInput
} from '../../styled/Input/InputGroup';
import Dropdown, {
	DropdownContent,
	DropdownHeader
} from '../../styled/common/Dropdown';

const SearchInputGroup = styled(InputGroup)`
	padding-top: 8px;
	height: 2rem;
	width: 20rem;
`;

const SearchInputInput = styled(InputGroupInput)`
	&:focus-within {
		> .dropDown {
			display: flex;
		}
	}

	> .dropDown {
		display: none;
	}
`;

const SearchBar = props => (
	<SearchInputGroup>
		<InputGroupAppend>
			<p>Search</p>
		</InputGroupAppend>

		<SearchInputInput>
			{!_.isEmpty(props.searchData.data) &&
				props.searchQuery !== '' && (
					<Dropdown className="dropDown">
						{Object.entries(props.searchData.data).map(entry => (
							<div key={`search-header-${entry[0]}`}>
								<DropdownHeader>
									<p>{entry[0]}</p>
									<p>{entry[1].length}</p>
								</DropdownHeader>

								{entry[1].map(data => (
									<DropdownContent
										key={`search-data-${
											entry[0]
										}-${data.display_name || data.title}`}
									>
										<Link to={`/${entry[0]}/${data.id}`}>
											{data.display_name || data.title}
										</Link>
									</DropdownContent>
								))}
							</div>
						))}
					</Dropdown>
				)}
			<input onChange={props.getSearch} type="text" />
		</SearchInputInput>
	</SearchInputGroup>
);

SearchBar.propTypes = {
	searchQuery: propTypes.string.isRequired,
	searchData: propTypes.oneOfType([propTypes.shape(), propTypes.array])
		.isRequired,
	getSearch: propTypes.func.isRequired
};

export default SearchBar;
