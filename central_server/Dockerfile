FROM denoland/deno:1.30.2

COPY src/* /usr/src/eszett/

ENTRYPOINT ["/tini" "--" "docker-entrypoint.sh"]
CMD ["run" "/user/src/eszett/server.ts"]