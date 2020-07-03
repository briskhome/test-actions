# `bump-version`
This action updates minor version in `package.json`, commits the change, creates a tag and pushes it all back to the repository.

#### How to use
```yaml
...
  steps:
  - name: Bump version
      uses: ./.github/actions/bump-version
      with:
        # Username that will be used to author the commit
        actor: osome-bot
        # Personal access token of the above user
        token: ${{ secrets.token }}token
```

It is vital to blocklist `package.json` from triggering your main build workflow! Otherwise you may and will go into infinite loop and pay a lot of money for GitHub Actions:
```yaml
on:
  push:
    branches: [ master ]
    paths-ignore:
      - 'package.json'
```

#### Configure commit message
If you want commit messages to follow the `vX.Y.Z` style then you need to add the following line to `.npmrc` file in the repository where you're using this action:
```
message="v%s"
```

#### Configure tag
You can only configure prefix of a tag. By default, the prefix is `v`, so in case you want to remove it you need ot add the following line to your `.npmrc`:
```
tag-version-prefix=""
``` 
 
