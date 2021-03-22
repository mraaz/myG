### ES Mappings
Before using the local Elasticsearch instance, you should add these mappings for the auto complete fields to work.
This can and should be automated at some point, but for now let's run these queries manually when we docker-compose up for the 1st time.

### Accessing ES
http://localhost:9200/
http://localhost:5601/app/kibana#/dev_tools/console?_g=()

### Elasticsearch Docker VM Memory
On MacOS you might need to run the following commands to get the ES container to stay up and running:
```
docker-machine ssh
sudo sysctl -w vm.max_map_count=262144
exit
```

## Reindex
This is the process we need to follow when we want to change the mappings, let's say it's for the users index.

# 1. Create new index with the new mappings, in the format of {index-name}_{MM_DD_YYYY} 
PUT users_03_16_2021
{ mappings }

# 2. Move data from the previous index to the new one
POST _reindex
{
  "source": {
    "index": "users_{previous-date}"
  },
  "dest": {
    "index": "users_03_16_2021"
  }
}

# 3. Change the users aliasing to point to the new index
POST /_aliases
{
  "actions" : [
    { "add" : { "index" : "users_03_16_2021", "alias" : "users" } },
    { "remove" : { "index" : "users_{previous-date}", "alias" : "users" } }
  ]
}

# 4. Re-run the reindex to ensure no data was lost
# 5. Delete the old index

### Things that could go wrong
You might not know the names/state of the indices and aliases:
GET _cat/indices
GET _cat/aliases

The index might be called `users` and you want to create an alias called `users`, in which case you'll need to delete the index before creating the alias in step 3, which means the step 4 and 5 won't happen and you'll lose data if you don't move it to another temporary index first.

The mapping change might be incompatible between indices, in which case you won't be able to migrate the data through reindex.
In that case, either you make an script to transform the data as needed, or delete all the data and rebuild it from the MySQL database (source of truth), which is much easier.

## Mappings
Below are the actual mappings we want to use.

### Users
PUT users
{
  "settings": {
    "analysis": {
      "filter": {
        "autocomplete_filter": {
          "type": "edge_ngram",
          "min_gram": 1,
          "max_gram": 20
        }
      },
      "analyzer": {
        "autocomplete": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "autocomplete_filter"
          ]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "alias": {
        "type": "text",
        "analyzer": "autocomplete",
        "search_analyzer": "standard"
      },
      "country": {
        "type": "text",
        "analyzer": "autocomplete",
        "search_analyzer": "standard"
      },
      "relationship": {
        "type": "text",
        "analyzer": "autocomplete",
        "search_analyzer": "standard"
      },
      "commendations": {
        "type": "text",
        "analyzer": "autocomplete",
        "search_analyzer": "standard"
      },
      "team": {
        "type": "text",
        "analyzer": "autocomplete",
        "search_analyzer": "standard"
      },
      "languages": {
        "type": "text",
        "analyzer": "autocomplete",
        "search_analyzer": "standard"
      },
      "mostPlayedGames": {
        "type": "text",
        "analyzer": "autocomplete",
        "search_analyzer": "standard"
      },
      "gameExperiences.name": {
        "type": "text",
        "analyzer": "autocomplete",
        "search_analyzer": "standard",
        "fields" : {
          "keyword" : {
            "type" : "keyword",
            "ignore_above" : 256
          }
        }
      },
      "underage" : {
        "type" : "boolean"
      },
      "has_mic" : {
        "type" : "boolean"
      }
    }
  }
}

### Games
PUT /games/
{
  "settings": {
    "analysis": {
      "filter": {
        "autocomplete_filter": {
          "type": "edge_ngram",
          "min_gram": 1,
          "max_gram": 20
        }
      },
      "analyzer": {
        "autocomplete": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "autocomplete_filter"
          ]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "description": {
        "type": "text",
        "analyzer": "autocomplete",
        "search_analyzer": "standard"
      },
      "start_date_time": {
        "type": "date" 
      },
      "end_date_time": {
        "type": "date" 
      },
      "expiry": {
        "type": "date" 
      }
    }
  }
}

### Game Names
PUT /game_names/
{
  "settings": {
    "analysis": {
      "filter": {
        "autocomplete_filter": {
          "type": "edge_ngram",
          "min_gram": 1,
          "max_gram": 20
        }
      },
      "analyzer": {
        "autocomplete": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "autocomplete_filter"
          ]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "game_name": {
        "type": "text",
        "analyzer": "autocomplete",
        "search_analyzer": "standard"
      }
    }
  }
}