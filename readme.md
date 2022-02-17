           <p style="font-weight: bold;">Features & changelog</p>
            <p>Languages: HTML, CSS, vanilla Javascript ES6</p>
            <p style="font-style: italic;">Current version: v5 (RC 1) (31 January 2022)</p>
            <ul>
                <li>JS fetch: fetches data from an API.</li>
                <li>v1 (Alpha 1): Basic search for characters only & character names only.</li>
                <li>v2 (Alpha 2): Included monsters into the search / Added random character button / Search result output: by name, ascending.</li>
                <li>v3 (Beta 1): JS sort added: If the search term matches the beginning of a name, the matching entry will be moved to the start.</li>
                <li>v4 (Beta 2): Dynamically choose what to search through (characters, monsters or games) via checkboxes.
                <li>v4.1: Dynamically add or remove entries in real time from search results based on checkboxes.</li>
                <li>v4.2: Sort fine-tuning: if the search term matches a separate word in the name which is not the first word, the result will be moved to the start. E.g. searching "Shinra" puts "President Shinra" at the start, "Darkness" -> "Cloud of Darkness", "Fina" -> "Dark Fina" etc.</li>
                </li>
                <li>v5 (RC 1)
                    <ul>
                        <li>Major code refactoring:
                            <ul>
                                <li>Guard clauses for conditional statements.</li>
                                <li>Additional logic + checks.</li>
                                <li>Data class introduced.</li>
                                <li>Promise.all introduced (instead of multiple single promises resolve).</li>
                            </ul>
                        </li>
                        <li>Search term will be updated on page load and performs initial search if not empty.</li>
                        <li>Bugs fixed: B1</li>
                    </ul>
                </li>
                <li>v5.2 (RC 1): If search value is empty, show "Please enter search term" instead of nothing (where the search results will show up). If search term doesn't much anything, tell that to the user.</li>
            </ul>
            <p>To do / Up next:</p>
            <ul>
                <li>-</li>
            </ul>
            <p>Bugs:</p>
            <ul>
                <li>[fixed in v5] B1: Search doesn't check initial checkboxes status on window load. To reproduce: Search for "yuna" → uncheck "Characters" → reload page → remove last letter from search "yuna". Characters are still included despite checkbox "Characters" unchecked on page reload.</li>
            </ul>
