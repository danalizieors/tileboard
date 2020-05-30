# store current branch name and state
branch_name=$(git rev-parse --abbrev-ref HEAD)
working_directory_clean=$(git status --porcelain)
if [ -n "$working_directory_clean" ]; then
    git stash push --include-untracked
fi

# create empty gh-pages branch
git branch --delete --force gh-pages
git checkout --orphan gh-pages
if [ -n "$working_directory_clean" ]; then
    git stash apply
fi

# remove not ignored files except .gitignore
git rm --cached --force -r .
git add *.gitignore
git clean --force .

# copy content of specified directory to project root
cp --archive ./$1/. .

# stage not ignored files except .gitignore
git add .
git rm --cached *.gitignore

# commit and push staged files
git commit --message "Deploy"
git push --force --set-upstream origin gh-pages

# restore initial branch and delete local gh-pages
git checkout --force $branch_name
if [ -n "$working_directory_clean" ]; then
    git stash pop --index
fi
git branch --delete --force gh-pages
